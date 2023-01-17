import express from "express";
import { authController } from "./controllers/auth.controller";
import { categoriesController } from "./controllers/categories.controller";
import { productsController } from "./controllers/products.controller";
import { ensureAuth } from "./middlewares/auth";

const router = express.Router();

router.get("/categories", categoriesController.index);
router.get("/categories/:id", categoriesController.show);
// Apenas usuários administradores podem cadastrar, atualizar ou deletar categorias novas
router.post("/categories/register", ensureAuth, categoriesController.register);
router.delete("/categories/:id", ensureAuth, categoriesController.delete);

router.get("/products", productsController.index);
router.get("/products/:id", productsController.show);
// Apenas usuários administradores podem cadastrar, atualizar ou deletar produtos novos
router.post("/products/register", ensureAuth, productsController.register);
router.put("/products/:id", ensureAuth, productsController.update);
router.delete("/products/:id", ensureAuth, productsController.delete);

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

export { router };
