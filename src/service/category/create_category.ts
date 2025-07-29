import { CategoryAlreadyExistsError } from "../../errors/category";
import { PostgresCreateCategoryRepository } from "../../repositories/postgres/category/create_category";
import { v4 as uuidV4 } from "uuid";
import { CreateCategoryData } from "../../schemas/category";
import { PostgresGetCategoryById } from "../../repositories/postgres/category/getCategoryById";

export class CreateCategoryService {
  constructor(
    private getCategoryById: PostgresGetCategoryById,
    private createCategoryRepository: PostgresCreateCategoryRepository
  ) {
    this.getCategoryById = getCategoryById;
    this.createCategoryRepository = createCategoryRepository;
  }

  async execute(createCategoryParams: CreateCategoryData) {
    const categoryId = uuidV4();

    const categoryAlreadyExists = await this.getCategoryById.execute(
      categoryId
    );

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError();
    }

    const newCategory = {
      ...createCategoryParams,
      id: categoryId,
    };

    const category = await this.createCategoryRepository.execute(newCategory);

    return category;
  }
}
