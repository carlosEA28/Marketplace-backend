import { notFound } from "./httpHelper";

export const ProductNotFoundResponse = () => {
  return notFound({
    message: "Nenhum produto encontrado",
  });
};
