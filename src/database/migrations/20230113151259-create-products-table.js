"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      category_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        // references é usado para simplificar a forma como vamos lidar com os relacionamentos entre tabelas
        references: { model: "categories", key: "id" },
        // as opções abaixo são para dizer oq acontece com o registro da tabela 'produtos' se a categoria da qual ele depende for atualizada ou excluída => onDelete = RESTRICT impossibilita a exclusão de qualquer categoria que possua algum produto
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
