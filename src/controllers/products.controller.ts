import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { Product } from "../models";
import { productsService } from "../services/products.service";

export const productsController = {
  // GET /products
  index: async (req: Request, res: Response) => {
    // Incluindo paginação
    const [pageNumber, perPageNumber] = getPaginationParams(req.query);
    try {
      const products = await productsService.findAllPaginated(
        pageNumber,
        perPageNumber
      );
      return res.status(201).json(products);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  show: async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await productsService.findById(id);
      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
