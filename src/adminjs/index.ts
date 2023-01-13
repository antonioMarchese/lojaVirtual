import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin", // rota para acessar adminJs na aplicação
  branding: {
    companyName: "AntonioMarchese",
  },
  resources: adminJsResources
});

export const adminJsRouter = AdminJSExpress.buildRouter(adminJs);
