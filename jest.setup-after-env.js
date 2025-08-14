import { prisma } from "./prisma/prisma";

beforeEach(async () => {
  await prisma.seller.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
});
