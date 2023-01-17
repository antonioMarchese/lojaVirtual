import { Request, Response } from "express";
import { getPaginationParams } from "../helpers/getPaginationParams";
import { Product } from "../models";
import { productsService } from "../services/products.service";

export interface UpdateProduct {
  name: string;
  quantity: number;
  status: "ACTIVE" | "INACTIVE";
  categoryId: number;
}

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

  register: async (req: Request, res: Response) => {
    const { name, categoryId, quantity } = req.body;
    const productAlredyExists = await productsService.findByName(name);
    if (productAlredyExists)
      return res.status(401).json({ message: "Produto ja cadastrado." });
    try {
      const product = await productsService.create({
        name,
        categoryId,
        quantity,
      });

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },

  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, quantity, status, categoryId }: UpdateProduct = req.body;
    try {
      const product = await productsService.update(id, {
        name,
        quantity,
        status,
        categoryId,
      });

      return res.status(201).json(product);
    } catch (error) {
      if (error instanceof Error)
        return res.status(400).json({ message: error.message });
    }
  },
};
