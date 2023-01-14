import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { User } from "../models";
import bcrypt from "bcrypt";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin", // rota para acessar adminJs na aplicação
  branding: {
    companyName: "AntonioMarchese",
  },
  resources: adminJsResources,
});

// Criação de uma rota autenticada para o painel do AdminJs
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    // Esse método é chamado na hora que o usuário tenta fazer login na tela do AdminJs
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email } });
      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);
        if (matched) return user;
      }
      return false;
    },
    cookiePassword: "12345",
  },
  null,
  { resave: false, saveUninitialized: false }
);
