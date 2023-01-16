import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { Category } from "../models";
import { categoriesService } from "../services/categories.service";

export const categoriesController = {
  index: async (req: Request, res: Response) => {
    // Incluindo paginação
    const [pageNumber, perPageNumber] = getPaginationParams(req.query);
    try {
      const categories = await categoriesService.findAllPaginated(
        pageNumber,
        perPageNumber
      );
      return res.status(201).json(categories);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
