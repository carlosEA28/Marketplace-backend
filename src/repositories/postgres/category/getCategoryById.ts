import { prisma } from "../../../../prisma/prisma";

export class PostgresGetCategoryById {
  async execute(categoryId: string) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    return category;
  }
}
