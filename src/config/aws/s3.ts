import { S3Client } from "@aws-sdk/client-s3";
import { env } from "../../env/env";

export class S3Config {
  getS3Client() {
    return new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
}
