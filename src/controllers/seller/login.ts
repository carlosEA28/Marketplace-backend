import { Request } from "express";
import { LoginSellerService } from "../../service/seller/login";
import { loginSchema } from "../../schemas/global/loginSchema";
import {
  badRequest,
  notFound,
  ok,
  serverError,
  unauthorized,
} from "../helpers/httpHelper";
import { ZodError } from "zod";
import { InvalidPasswordError, UserNotFoundError } from "../../errors/seller";

export class LoginSellerController {
  constructor(private loginSellerService: LoginSellerService) {}

  async execute(httpRequest: Request) {
    try {
      const params = httpRequest.body;

      await loginSchema.parseAsync(params);

      const seller = await this.loginSellerService.execute(params);

      return ok(seller); // ✅ statusCode + body
    } catch (error) {
      if (error instanceof ZodError) {
        return badRequest({ message: error.message });
      }

      if (error instanceof InvalidPasswordError) {
        return unauthorized({ message: "Senha inválida" });
      }

      if (error instanceof UserNotFoundError) {
        return notFound({ message: "Usuário não encontrado" });
      }

      return serverError("Erro interno no servidor"); // ✅ ADICIONAR retorno default
    }
  }
}
