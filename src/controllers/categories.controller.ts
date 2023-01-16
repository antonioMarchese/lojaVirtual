import { Request, Response } from "express";
import { Category } from "../models";

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name"],
        order: [["id", "ASC"]],
      });
      return res.status(201).json(categories);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
