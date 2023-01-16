import { Request, Response } from "express";
import { jwtService } from "../services/jwt.service";
import { userService } from "../services/user.service";

export const authController = {
  // POST /auth/register
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, birth, phone } = req.body;
    try {
      const userAlredyExists = await userService.findByEmail(email);
      if (userAlredyExists) throw new Error("Email já cadastrado");

      const user = await userService.create({
        birth,
        email,
        firstName,
        lastName,
        password,
        phone,
        role: "user",
      });

      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await userService.findByEmail(email);

      if (!user)
        return res.status(404).json({ message: "E-mail não registrado." });

      user.checkPassword(password, (error, isSame) => {
        if (error) return res.status(400).json({ message: error.message });

        if (!isSame)
          return res.status(401).json({ message: "Senha incorreta." });

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };
        const expiresIn = "5d"; // Token expira em 5 dias
        const token = jwtService.signToken(payload, expiresIn);
        return res.json({
          authenticated: true,
          ...payload,
          token,
        });
      });
    } catch (error) {}
  },
};
