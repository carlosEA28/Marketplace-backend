import Redis from "ioredis";

export class RedisService extends Redis {
  constructor() {
    super({
      host: "localhost",
      port: 6379,
      password: "caduredis",
    });

    this.on("connect", () => {});

    this.on("error", (err) => {
      console.error("Erro no Redis:", err);
    });
  }
}
