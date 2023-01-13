import { ResourceOptions } from "adminjs";

export const categoryResourceOptions: ResourceOptions = {
  navigation: "Catalog",
  editProperties: ["name"],
  filterProperties: ["name", "createdAt", "updatedAt"],
  listProperties: ["id", "name"],
};
