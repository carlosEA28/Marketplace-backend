import Redis, { Callback, RedisKey } from "ioredis";
import { env } from "../../env/env";

interface writeDataProps {
  key: RedisKey;
  data: string;
  options: any;
}
export class RedisService extends Redis {
  constructor() {
    super({
      host: env.REDIS_HOST,
      port: Number(env.REDIS_PORT),
      password: env.REDIS_PASSWORD,
    });

    this.on("connect", () => {});

    this.on("error", (err) => {
      console.error("Erro no Redis:", err);
    });
  }

  async writeData({ key, data, options }: writeDataProps) {
    try {
      await this.set(key, data, options);
    } catch (error) {
      console.log(`Failed to cache data for key=${key}`, error);
    }
  }

  async readData(key: RedisKey) {
    let cachedValue = undefined;

    cachedValue = await this.get(key);
    if (cachedValue) {
      return cachedValue;
    }
  }
}
