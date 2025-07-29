import { CreateCategoryController } from "../../controllers/category/create_category";
import { PostgresCreateCategoryRepository } from "../../repositories/postgres/category/create_category";
import { PostgresGetCategoryById } from "../../repositories/postgres/category/getCategoryById";
import { CreateCategoryService } from "../../service/category/create_category";

export const makeCreateCategoryController = () => {
  const getCategoryById = new PostgresGetCategoryById();
  const createCategoryRepository = new PostgresCreateCategoryRepository();

  const createCategoryService = new CreateCategoryService(
    getCategoryById,
    createCategoryRepository
  );

  const createCategoryController = new CreateCategoryController(
    createCategoryService
  );

  return createCategoryController;
};
