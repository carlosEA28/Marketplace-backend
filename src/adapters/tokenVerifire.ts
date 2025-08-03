import jwt, { JwtPayload } from "jsonwebtoken";

export class TokenVerifierAdapter {
  execute(token: string, secret: string): JwtPayload {
    const decoded = jwt.verify(token, secret);
    return decoded as JwtPayload; // 🔹 força retorno como objeto
  }
}
