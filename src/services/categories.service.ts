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
};
