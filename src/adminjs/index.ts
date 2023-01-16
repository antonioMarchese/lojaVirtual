import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import { dashboardOptions } from "./dashboard";
import { authOptions } from "./auth";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin", // rota para acessar adminJs na aplicação
  branding: {
    companyName: "AntonioMarchese",
  },
  resources: adminJsResources,
  locale: locale,
  dashboard: dashboardOptions,
});

// Criação de uma rota autenticada para o painel do AdminJs
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authOptions,
  null,
  { resave: false, saveUninitialized: false }
);
