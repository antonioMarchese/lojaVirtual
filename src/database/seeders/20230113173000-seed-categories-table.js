"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        { name: "Eletrônicos", created_at: new Date(), updated_at: new Date() },
        { name: "Comidas", created_at: new Date(), updated_at: new Date() },
        { name: "Roupas", created_at: new Date(), updated_at: new Date() },
        { name: "Calçados", created_at: new Date(), updated_at: new Date() },
        { name: "Malas", created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
