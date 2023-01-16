import { AuthenticationOptions } from "@adminjs/express";
import bcrypt from "bcrypt";
import { User } from "../models";

// Esse método é chamado na hora que o usuário tenta fazer login na tela do AdminJs
export const authOptions: AuthenticationOptions = {
  authenticate: async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (user && user.role === "admin") {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) return user;
    }
    return false;
  },

  cookiePassword: "12345",
};
