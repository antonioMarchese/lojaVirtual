"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Com o método 'query' podemos escrever uma query em SQL
    const [categories] = await queryInterface.sequelize.query(
      "SELECT id FROM categories;"
    );

    await queryInterface.bulkInsert("products", [
      {
        name: "iPhone X",
        category_id: categories[0].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Xiaomi Redmi 8",
        category_id: categories[0].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Acer Aspire 5",
        category_id: categories[0].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "ApplePods",
        category_id: categories[0].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Lâmpada bluethooth",
        category_id: categories[0].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Whey Protein",
        category_id: categories[1].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Barrinha de proteína",
        category_id: categories[1].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Açaí com granola e mel",
        category_id: categories[1].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Smash Burger",
        category_id: categories[1].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Camisa estampa florida FIRE",
        category_id: categories[2].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Bermuda cargo preta",
        category_id: categories[2].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "AirForce branco",
        category_id: categories[3].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mala de mão Bagaggio",
        category_id: categories[4].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Mala de mão LV",
        category_id: categories[4].id,
        quantity: 5,
        status: "ACTIVE",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  },
};
