import z from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_REGION: z.string(),
  BUCKET_NAME: z.string(),
  REDIS_HOST: z.string(),
  REDIS_PORT: z.string().pipe(z.coerce.number()),
  REDIS_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
