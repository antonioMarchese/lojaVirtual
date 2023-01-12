import express from "express";
import { sequelize } from "./database";

const app = express();

// Geralmente o valor da porta fica armazenada numa variavel ambiente em '.env', por isso o 'ou = ||'
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  // sequelize.authenticate executa uma query qualquer e se ela funcionar, a conexão com o banco de dados funcionou => uma forma de checar a conexão com o banco de dados.
  sequelize.authenticate().then(() => {
    console.log("DB connection successful.");
  });
  console.log(`Server started successfuly at port ${PORT}`);
});