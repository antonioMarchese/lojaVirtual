// Esse arquivo precisa exportar um objeto para configurar a sequelizeCli para que ela possa
// se conectar com o banco de dados
module.exports = {
  development: {
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    database: "lojavirtual_development",
    username: "lojavirtual",
    password: "lojavirtual",
  },
};
