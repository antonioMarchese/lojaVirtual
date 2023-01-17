import { UpdateProduct } from "../controllers/products.controller";
import { Product } from "../models";
import { ProductCreationAttributes } from "../models/Product";

export const productsService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage; // offset é usado la no SQL

    const { count, rows } = await Product.findAndCountAll({
      // Paranoid falso possibilita a listagem de produtos ja marcados como deletados
      paranoid: false,
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
      limit: perPage,
      offset,
      include: {
        association: "category",
        attributes: ["id", "name"],
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
      paranoid: false, // faz com que seja possível obter as informações do produto mesmo que ele tenha sido deletado
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

    if (!products[0]) throw new Error("Produto ainda não cadastrado.");

    return products[0];
  },

  delete: async (id: number) => {
    await Product.destroy({
      where: { id },
    });
  },
};
