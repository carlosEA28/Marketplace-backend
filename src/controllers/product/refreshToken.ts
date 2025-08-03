import { Request } from "express";
import { RefreshTokenService } from "../../service/seller/refreshToken";
import { ok, serverError, unauthorized } from "../helpers/httpHelper";
import { UnauthorizedError } from "../../errors/seller";

export class RefreshTokenController {
  constructor(private refreshTokenService: RefreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }
  async execute(httpRequest: Request) {
    try {
      const { refreshToken } = httpRequest.body;

      const newToken = await this.refreshTokenService.execute(refreshToken);

      return ok(newToken);
    } catch (error) {
      console.log(error);

      if (error instanceof UnauthorizedError) {
        return unauthorized("Você não está autorizado a realizar esta ação");
      }

      return serverError("Ocorreu um erro ao processar sua solicitação");
    }
  }
}
