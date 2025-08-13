import { Request, Response, NextFunction } from "express";
import { RedisService } from "../config/redis/redis";

const redis = new RedisService();

export function cacheMiddleware(prefix: string, ttlSeconds?: number) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cacheKey = `${prefix}:${req.originalUrl}`;

      const cached = await redis.readData(cacheKey);

      if (cached) {
        return res.json(JSON.parse(cached));
      }

      const originalJson = res.json.bind(res);
      res.json = (body) => {
        redis.writeData({
          key: cacheKey,
          data: JSON.stringify(body),
          options: ttlSeconds ? ["EX", ttlSeconds] : undefined,
        });
        return originalJson(body);
      };

      next();
    } catch (error) {
      console.error("Erro no middleware de cache:", error);
      next();
    }
  };
}
