import { ResourceWithOptions } from "adminjs";
import { Category, Product, User } from "../../models";
import { categoryResourceOptions } from "./category";
import { productResourceOptions } from "./product";
import { userResourceOptions } from "./user";

export const adminJsResources: ResourceWithOptions[] = [
  {
    resource: Category,
    options: categoryResourceOptions,
  },
  {
    resource: Product,
    options: productResourceOptions,
  },
  {
    resource: User,
    options: userResourceOptions,
  },
];
