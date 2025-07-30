import { S3Client } from "@aws-sdk/client-s3";
import { PostegresCreateProductRepository } from "../../repositories/postgres/product/create_product";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";
import { S3Service } from "../../service/s3";
import { CreateProductService } from "../../service/product/create_product";
import { CreateProductController } from "../../controllers/product/create_product";
import { PostgreGetAllAnoucedProductsQuantityRepository } from "../../repositories/postgres/product/getAllAnoucedProducts";
import { GetAllAnoucedProductsQuantityController } from "../../controllers/product/getAllAnouncedProducts";
import { GetAllAnoucedProductsQuantityService } from "../../service/product/getAllAnoucedProducts";
// import PostgreGetAllAnoucedProductsRepository

export const makeCreateProductController = () => {
  const getSellerByIdRepository = new PostgresGetSellerById();
  const createProductRepository = new PostegresCreateProductRepository();
  const s3Service = new S3Service(new S3Client());

  const createProductService = new CreateProductService(
    getSellerByIdRepository,
    createProductRepository,
    s3Service
  );

  const createProductController = new CreateProductController(
    createProductService
  );

  return createProductController;
};

export const makeGetAllAnoucedProductsQuantityController = () => {
  const getSellerByIdRepository = new PostgresGetSellerById();
  const getAllAnouncedProductsRepository =
    new PostgreGetAllAnoucedProductsQuantityRepository();

  const getAllAnouncedProductsService =
    new GetAllAnoucedProductsQuantityService(
      getSellerByIdRepository,
      getAllAnouncedProductsRepository
    );

  const getAllAnouncedProductsController =
    new GetAllAnoucedProductsQuantityController(getAllAnouncedProductsService);

  return getAllAnouncedProductsController;
};
