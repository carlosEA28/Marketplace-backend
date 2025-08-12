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
import { GetProductsByCategoryService } from "../../service/product/getProductsByCategory";
import { PostgresGetProductsByCategoryRepository } from "../../repositories/postgres/product/getProductsByCategory";
import { PostgresGetCategoryById } from "../../repositories/postgres/category/getCategoryById";
import { GetProductsByCategoryController } from "../../controllers/product/getProductsByCategoryId";
import { PostgresGetProductsByPriceRangeRepository } from "../../repositories/postgres/product/getProductFromPriceRange";
import { GetProductsByPriceRangeService } from "../../service/product/getProductsByPriceRange";
import { GetProductsByPriceRangeController } from "../../controllers/product/getProdcutsByPriceRange";
import { RedisGetAllSellerProductsRepository } from "../../repositories/cache/products/redis-getAllSellerProductsRepository";
import { RedisService } from "../../config/redis/redis";

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

  const redisService = new RedisService();

  const redisGetAllSellerProductsRepository =
    new RedisGetAllSellerProductsRepository(
      getAllSellerProductsRepository,
      redisService
    );

  const getAllSellerProductsController = new GetAllSellerProductsController(
    redisGetAllSellerProductsRepository
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

export const makeGetProductsByCategoryController = () => {
  const getProductsByCategory = new PostgresGetProductsByCategoryRepository();
  const getCategoryById = new PostgresGetCategoryById();

  const getProductsByCategoryService = new GetProductsByCategoryService(
    getCategoryById,
    getProductsByCategory
  );

  const getProductsByCategoryController = new GetProductsByCategoryController(
    getProductsByCategoryService
  );

  return getProductsByCategoryController;
};

export const makeGetProductsByPriceRangeController = () => {
  const getProductsByPriceRangeRepository =
    new PostgresGetProductsByPriceRangeRepository();
  const getProductsByPriceRangeService = new GetProductsByPriceRangeService(
    getProductsByPriceRangeRepository
  );

  const getProductsByPriceRangeController =
    new GetProductsByPriceRangeController(getProductsByPriceRangeService);

  return getProductsByPriceRangeController;
};
