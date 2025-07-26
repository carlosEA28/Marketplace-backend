import z from "zod";
import { prisma } from "../../prisma/prisma";
import { CreateSellerProps } from "../schemas/seller";
import { v4 as uuidv4 } from "uuid";

type CreateSellerData = z.infer<typeof CreateSellerProps>;

export class PostgresCreateSellerRepository {
  async execute({
    full_name,
    phone,
    email,
    password,
    cpf,
    avatarImg,
  }: CreateSellerData) {
    const seller = await prisma.seller.create({
      data: {
        id: uuidv4(),
        full_name,
        phone,
        email,
        password,
        cpf,
        avatarImage: avatarImg,
      },
    });

    return seller;
  }
}
