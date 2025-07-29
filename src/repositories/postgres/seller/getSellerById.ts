import { prisma } from "../../../../prisma/prisma";

export class PostgresGetSellerById {
  async execute(sellerId: string) {
    const seller = await prisma.seller.findUnique({
      where: {
        id: sellerId,
      },
    });

    return seller;
  }
}
