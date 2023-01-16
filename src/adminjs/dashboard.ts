import AdminJS, { PageHandler } from "adminjs";
import { Category, Product, User } from "../models";

export const dashboardOptions: {
  handler?: PageHandler;
  component?: string;
} = {
  component: AdminJS.bundle("./components/Dashboard"),
  handler: async (req, res, context) => {
    const categories = await Category.count();
    const products = await Product.count();
    const users = await User.count({
      where: {
        role: "user",
      },
    });

    res.json({
      Categorias: categories,
      Produtos: products,
      Usuários: users,
    });
  },
};
