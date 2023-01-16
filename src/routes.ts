import express from "express";
import { userResourceOptions } from "./adminjs/resources/user";
import { authController } from "./controllers/auth.controller";
import { categoriesController } from "./controllers/categories.controller";
import { productsController } from "./controllers/products.controller";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);

router.get("/products", productsController.index);
router.get("/products/:id", productsController.show);

router.post("/auth/register", authController.register);

export { router };
