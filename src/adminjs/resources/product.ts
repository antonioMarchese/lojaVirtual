import { ResourceOptions } from "adminjs";

export const productResourceOptions: ResourceOptions = {
  navigation: "Catalog",
  editProperties: ["name", "quantity", "status", "categoryId"],
  filterProperties: [
    "name",
    "status",
    "categoryId",
    "createdAt",
    "updatedAt",
    "deletedAt",
  ],
  listProperties: ["id", "name", "status", "categoryId"],
  properties: {
    status: {
      availableValues: [
        { value: "ACTIVE", label: "Active" },
        { value: "INACTIVE", label: "Inactive" },
      ],
    },
  },
};
