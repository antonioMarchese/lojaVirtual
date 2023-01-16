import { Product } from "../models";

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
};
