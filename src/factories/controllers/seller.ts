import { PasswordEncoderAdapter } from "../../adapters/passwordEncoder";
import { TokenGeneratorAdapter } from "../../adapters/tokenGenerator";
import { CreateSellerController } from "../../controllers/seller/create_seller";
import { PostgresCreateSellerRepository } from "../../repositories/postgres/seller/create_seller";
import { PostgresGetSellerByEmailRepository } from "../../repositories/postgres/seller/getSellerByEmail";
import { CreateSellerService } from "../../service/seller/create_seller";

export const makeCreateSellerController = () => {
  const getSellerByEmail = new PostgresGetSellerByEmailRepository();

  const createSellerRepository = new PostgresCreateSellerRepository();

  const passwordEncoderAdapter = new PasswordEncoderAdapter();

  const tokenGeneratorAdapter = new TokenGeneratorAdapter();

  const createSellerService = new CreateSellerService(
    getSellerByEmail,
    createSellerRepository,
    passwordEncoderAdapter,
    tokenGeneratorAdapter
  );

  const createSellerController = new CreateSellerController(
    createSellerService
  );

  return createSellerController;
};
