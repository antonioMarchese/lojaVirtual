import { Category } from "../models";

export const categoriesService = {
  findAllPaginated: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage; // offset é usado la no SQL

    const { count, rows } = await Category.findAndCountAll({
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
      limit: perPage,
      offset,
    });

    return {
      page,
      perPage,
      total: count,
      categories: rows,
    };
  },

  findByIdWithProducts: async (id: string) => {
    const categoryWithProducts = await Category.findByPk(id, {
      attributes: ["id", "name"],
      include: {
        association: "products",
        attributes: ["id", "name", "quantity", "status"],
        order: [["id", "ASC"]],
      },
    });

    return categoryWithProducts;
  },

  findByName: async (name: string) => {
    const category = await Category.findOne({
      where: { name },
    });
    return category;
  },

  create: async (name: string) => {
    const category = await Category.create({
      name,
    });
    return category;
  },

  delete: async (id: number) => {
    await Category.destroy({ where: { id } });
  },
};
