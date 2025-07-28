import { S3Client } from "@aws-sdk/client-s3";
import { PasswordEncoderAdapter } from "../../adapters/passwordEncoder";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { S3Config } from "../../config/aws/s3";
import { CreateSellerController } from "../../controllers/seller/create_seller";
import { PostgresCreateSellerRepository } from "../../repositories/postgres/seller/create_seller";
import { PostgresGetSellerByEmailRepository } from "../../repositories/postgres/seller/getSellerByEmail";
import { S3Service } from "../../service/s3";
import { CreateSellerService } from "../../service/seller/create_seller";

export const makeCreateSellerController = () => {
  const getSellerByEmail = new PostgresGetSellerByEmailRepository();

  const createSellerRepository = new PostgresCreateSellerRepository();

  const passwordEncoderAdapter = new PasswordEncoderAdapter();

  const tokenGeneratorAdapter = new TokenGeneratorAdapter();

  const s3ClientService = new S3Service(new S3Client());

  const createSellerService = new CreateSellerService(
    getSellerByEmail,
    createSellerRepository,
    passwordEncoderAdapter,
    tokenGeneratorAdapter,
    s3ClientService
  );

  const createSellerController = new CreateSellerController(
    createSellerService
  );

  return createSellerController;
};
