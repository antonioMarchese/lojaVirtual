/* Conexão com o banco de dados dentro da aplicação */
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "lojavirtual_development",
  username: "lojavirtual",
  password: "lojavirtual",
  define: {
    underscored: true, // Sequelize converte de snake_case do banco de dados para camelCase no JavaScript
  },
});
