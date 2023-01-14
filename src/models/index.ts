import { Product } from "./Product";
import { Category } from "./Category";
import { User } from "./User";
// É exatamente o que parece: uma categoria tem vários produtos e um produto pertence a uma categoria
Category.hasMany(Product);
Product.belongsTo(Category);

export { Category, Product, User };
