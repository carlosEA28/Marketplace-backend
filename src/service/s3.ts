import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "../env/env";
import { badRequest } from "../controllers/helpers/httpHelper";
export class S3Service {
  private s3Client: S3Client;

  constructor(s3Client: S3Client) {
    this.s3Client = s3Client;
  }
  async uploadFile(fileName: string, fileBuffer: Buffer, mimeType: string) {
    const uploadParams = {
      Bucket: env.BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    };
    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));

      console.log("File uploaded successfully.");

      return `https://${env.BUCKET_NAME}.s3.${env.AWS_REGION}.amazonaws.com/uploads/${fileName}`;
    } catch (err) {
      console.log(err);

      throw badRequest({
        message: "Erro ao fazer upload do arquivo para o S3",
      });
    }
  }
}
