import de from "zod/v4/locales/de.js";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { TokenVerifierAdapter } from "../../adapters/tokenVerifire";
import { env } from "../../env/env";
import { UnauthorizedError } from "../../errors/seller";

export class RefreshTokenService {
  constructor(
    private tokenGeneratorAdapter: TokenGeneratorAdapter,
    private tokenVerifier: TokenVerifierAdapter
  ) {}

  async execute(refreshToken: string) {
    try {
      const decodedToken = this.tokenVerifier.execute(
        refreshToken,
        env.JWT_REFRESH_TOKEN_SECRET
      );

      const newTokens = await this.tokenGeneratorAdapter.execute(
        decodedToken.sellerId
      );

      return newTokens;
    } catch (error) {
      console.error("Erro ao renovar token:", error);
      throw new UnauthorizedError();
    }
  }
}
