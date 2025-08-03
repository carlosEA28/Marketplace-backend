import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../env/env";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decodedToken = jwt.verify(
      accessToken,
      env.JWT_ACCESS_TOKEN_SECRET
    ) as JwtPayload & { sellerId: string };

    if (!decodedToken?.sellerId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.sellerId = decodedToken.sellerId;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
