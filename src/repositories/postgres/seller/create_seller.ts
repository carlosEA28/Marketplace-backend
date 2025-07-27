import z from "zod";
import { prisma } from "../../../../prisma/prisma";
import { CreateSellerProps } from "../../../schemas/seller";
import { v4 as uuidv4 } from "uuid";

type CreateSellerData = z.infer<typeof CreateSellerProps>;

export class PostgresCreateSellerRepository {
  async execute(createSellerParams: CreateSellerData) {
    const seller = await prisma.seller.create({
      data: {
        id: uuidv4(),
        full_name: createSellerParams.full_name,
        phone: createSellerParams.phone,
        email: createSellerParams.email,
        password: createSellerParams.password,
        cpf: createSellerParams.cpf,
        avatarImage: createSellerParams.avatarImg,
      },
    });

    return seller;
  }
}
