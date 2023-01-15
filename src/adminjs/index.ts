import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { Category, Product, User } from "../models";
import bcrypt from "bcrypt";
import { locale } from "./locale";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin", // rota para acessar adminJs na aplicação
  branding: {
    companyName: "AntonioMarchese",
  },
  resources: adminJsResources,
  locale: locale,
  dashboard: {
    component: AdminJS.bundle("./components/Dashboard"),
    handler: async (req, res, context) => {
      const categories = await Category.count();
      const products = await Product.count();
      const users = await User.count({
        where: {
          role: "user",
        },
      });

      res.json({
        Categorias: categories,
        Produtos: products,
        Usuários: users,
      });
    },
  },
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
