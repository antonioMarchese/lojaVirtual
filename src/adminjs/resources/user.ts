import { ResourceOptions } from "adminjs";

const userResourceOptions: ResourceOptions = {
  navigation: "Management",
  properties: {
    birth: {
      type: "date",
    },
    password: {
      type: "password",
    },
    role: {
      availableValues: [
        { value: "admin", label: "Administrador" },
        { value: "user", label: "Usuário Padrão" },
      ],
    },
  },
  editProperties: [
    "firstName",
    "lastName",
    "phone",
    "birth",
    "email",
    "role",
    "password",
  ],
  filterProperties: [
    "firstName",
    "lastName",
    "phone",
    "birth",
    "email",
    "createdAt",
    "role",
    "updatedAt",
  ],
  listProperties: ["id", "firstName", "email"],
  showProperties: [
    "id",
    "firstName",
    "lastName",
    "phone",
    "birth",
    "email",
    "role",
    "createdAt",
    "updatedAt",
  ],
};

export { userResourceOptions };
