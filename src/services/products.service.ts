import { UpdateProduct } from "../controllers/products.controller";
import { Product } from "../models";
import { ProductCreationAttributes } from "../models/Product";

export const productsService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage; // offset é usado la no SQL

    const { count, rows } = await Product.findAndCountAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
      limit: perPage,
      offset,
      include: {
        association: "category",
        attributes: ["id", "name"],
      },
      // Para que produtos deletados não apareçam nas buscas
      where: {
        deletedAt: null,
      },
    });

    return {
      page,
      perPage,
      total: count,
      products: rows,
    };
  },

  findById: async (id: string) => {
    const product = await Product.findByPk(id, {
      include: {
        association: "category",
        attributes: ["name", "id"],
      },
    });

    return product;
  },

  findByName: async (name: string) => {
    const product = await Product.findOne({
      where: { name },
    });

    return product;
  },

  create: async (attributes: ProductCreationAttributes) => {
    const product = await Product.create({ ...attributes, status: "ACTIVE" });
    return {
      id: product.id,
      name: product.name,
      quantity: product.quantity,
      status: product.status,
      categoryId: product.categoryId,
    };
  },

  update: async (id: string, attributes: UpdateProduct) => {
    const [affectedRows, products] = await Product.update(attributes, {
      where: { id },
      returning: true,
    });

    return products[0];
  },
};
