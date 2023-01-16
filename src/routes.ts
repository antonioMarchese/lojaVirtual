import express from "express";
import { categoriesController } from "./controllers/categories.controller";
import { productsController } from "./controllers/products.controller";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/products", productsController.index);
router.get("/products/:id", productsController.show);

export { router };
