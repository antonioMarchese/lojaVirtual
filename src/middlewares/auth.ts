import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwt.service";
import { userService } from "../services/user.service";
import { JwtPayload } from "jsonwebtoken";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null;
}

export function ensureAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .json({ message: "Não autorizado: nenhum token foi encontrado." });

  // authHeader = Bearer askfnsdjignsjsfrwq
  const token = authHeader.replace(/Bearer /, "");
  jwtService.verifyToken(token, (error, decoded) => {
    if (error || typeof decoded === "undefined")
      return res
        .status(401)
        .json({ message: "Não autorizado: token inválido." });

    userService.findByEmail((decoded as JwtPayload).email).then((user) => {
      if (user?.role === "admin") {
        req.user = user;
        next();
      } else {
        return res
          .status(401)
          .json({
            message:
              "Não autorizado: esta rota é permitida apenas para usuários administradores.",
          });
      }
    });
  });
}
