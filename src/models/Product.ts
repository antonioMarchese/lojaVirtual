import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database";

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  quantity: number;
  status: "ACTIVE" | "INACTIVE";
}

// As linhas abaixo informam que para criar um produto não precisamos informar o id nem o status
export interface ProductCreationAttributes
  extends Optional<Product, "id" | "status"> {}

export interface ProductInstance
  extends Model<Product, ProductCreationAttributes>,
    Product {}

export const Product = sequelize.define<ProductInstance, Product>(
  "Product",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["ACTIVE", "INACTIVE"]],
      },
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    paranoid: true,
    // paranoid true faz com que aconteça o soft-delete -> quando o método destroy é chamado, ao invés de apagar o elemento do banco de dados ele cria uma coluna 'deletedAt' com a data da exclusão -> automaticamente as querys ignorqm os elementos que possuirem 'deletedAt' diferente de null
  }
);
