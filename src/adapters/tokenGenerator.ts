import jwt from "jsonwebtoken";
import { env } from "../env/env";

export class TokenGeneratorAdapter {
  async execute(sellerId: string) {
    return {
      accessToken: jwt.sign({ sellerId }, env.JWT_ACCESS_TOKEN_SECRET, {
        expiresIn: "15m",
      }),

      refreshToken: jwt.sign({ sellerId }, env.JWT_REFRESH_TOKEN_SECRET, {
        expiresIn: "30d",
      }),
    };
  }
}
