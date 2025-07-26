import { prisma } from "../../../../prisma/prisma";

export class PostgresGetSellerByEmailRepository {
  async execute(email: string) {
    const seller = await prisma.seller.findUnique({
      where: {
        email,
      },
    });

    return seller;
  }
}
