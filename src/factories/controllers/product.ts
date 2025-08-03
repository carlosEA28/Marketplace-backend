import { S3Client } from "@aws-sdk/client-s3";
import { PostegresCreateProductRepository } from "../../repositories/postgres/product/create_product";
import { PostgresGetSellerById } from "../../repositories/postgres/seller/getSellerById";
import { S3Service } from "../../service/s3";
import { CreateProductService } from "../../service/product/create_product";
import { CreateProductController } from "../../controllers/product/create_product";
import { PostgreGetAllAnoucedProductsQuantityRepository } from "../../repositories/postgres/product/getAllAnoucedProducts";
import { GetAllAnoucedProductsQuantityController } from "../../controllers/product/getAllAnouncedProducts";
import { GetAllAnoucedProductsQuantityService } from "../../service/product/getAllAnoucedProducts";
import { PostgresGetAllSoldProductsQuantityRepository } from "../../repositories/postgres/product/getAllSoldProductsQuantity";
import { GetAllSoldProductsQuantityService } from "../../service/product/getAllSoldProductsQuantity";
import { GetAllSoldProductsQuantityController } from "../../controllers/product/getAllSoldProductsQuantity";
import { PostgresGetAllSellerProductsRepository } from "../../repositories/postgres/product/getAllSellerProducts";
import { GetAllSellerProductsController } from "../../controllers/product/getAllSellerProducts";
import { GetAllSellerProductsService } from "../../service/product/getAllSellerProducts";
import { PostgresGetAllProductsByTypeRepository } from "../../repositories/postgres/product/getSellerProductsByType";
import { GetAllSellerProductsByTypeController } from "../../controllers/product/getAllSellerProductsByType";
import { GetAllSellerProductsByTypeService } from "../../service/product/getAllSellerProductsByType";
import { PostgresGetProductById } from "../../repositories/postgres/product/getProductById";
import { PostgresUpdateProductRepository } from "../../repositories/postgres/product/updateProduct";
import { UpdateProductService } from "../../service/product/updateProduct";
import { UpdateProductController } from "../../controllers/product/updateProduct";
import { PostgresGetAllProductsRepository } from "../../repositories/postgres/product/getAllproducts";
import { GetAllProductsService } from "../../service/product/getAllProducts";
import { GetAllProductsController } from "../../controllers/product/getAllProducts";

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

export const makeGetAllSoldProductsQuantityController = () => {
  const getSellerByIdRepository = new PostgresGetSellerById();
  const getAllSoldProductsRepository =
    new PostgresGetAllSoldProductsQuantityRepository();

  const getAllSoldProductsService = new GetAllSoldProductsQuantityService(
    getSellerByIdRepository,
    getAllSoldProductsRepository
  );

  const getAllSoldProductsController = new GetAllSoldProductsQuantityController(
    getAllSoldProductsService
  );

  return getAllSoldProductsController;
};

export const makeGetAllSellerProductsController = () => {
  const getSellerByIdRepository = new PostgresGetSellerById();
  const getAllSellerProductsRepository =
    new PostgresGetAllSellerProductsRepository();

  const getAllSoldProductsService = new GetAllSellerProductsService(
    getSellerByIdRepository,
    getAllSellerProductsRepository
  );

  const getAllSellerProductsController = new GetAllSellerProductsController(
    getAllSoldProductsService
  );

  return getAllSellerProductsController;
};

export const makeGetAllSellerProductsByType = () => {
  const getSellerByIdRepository = new PostgresGetSellerById();
  const getAllSellerProductsByType =
    new PostgresGetAllProductsByTypeRepository();

  const getAllSellerProductsByTypeService =
    new GetAllSellerProductsByTypeService(
      getSellerByIdRepository,
      getAllSellerProductsByType
    );

  const getAllSellerProductsByTypeController =
    new GetAllSellerProductsByTypeController(getAllSellerProductsByTypeService);

  return getAllSellerProductsByTypeController;
};

export const makeUpdateProductController = () => {
  const getProductById = new PostgresGetProductById();
  const updateProductRepository = new PostgresUpdateProductRepository();

  const updateProductService = new UpdateProductService(
    getProductById,
    updateProductRepository
  );

  const updateProductController = new UpdateProductController(
    updateProductService
  );

  return updateProductController;
};

export const makeGetAllProductsController = () => {
  const getAllProductsRepository = new PostgresGetAllProductsRepository();

  const getAllProductsService = new GetAllProductsService(
    getAllProductsRepository
  );

  const getAllProductsController = new GetAllProductsController(
    getAllProductsService
  );

  return getAllProductsController;
};
