import { prisma } from "../../../../prisma/prisma";
import { CreateCategoryData } from "../../../schemas/category";

export class PostgresCreateCategoryRepository {
  async execute(createCategoryParams: CreateCategoryData) {
    const category = await prisma.category.create({
      data: {
        name: createCategoryParams.name,
      },
    });

    return category;
  }
}
