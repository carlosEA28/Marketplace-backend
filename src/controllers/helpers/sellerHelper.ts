import { badRequest } from "./httpHelper";

export const generateEmailAlreadyInUse = () => {
  return badRequest({
    message: "Esse email já está em uso",
  });
};
