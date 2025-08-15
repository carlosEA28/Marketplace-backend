import { PostgresCreateSellerRepository } from "./create_seller";
import { prisma } from "../../../../prisma/prisma";
import { describe, expect, it, beforeEach, jest } from "@jest/globals";
import { seller } from "../../../tests/fixtures/seller";

describe("Create user repository", () => {
  beforeEach(async () => {
    await prisma.seller.deleteMany({});
  });

  it("should create a seller on db", async () => {
    const sut = new PostgresCreateSellerRepository();

    const res = await sut.execute(seller);

    expect(res.id).toBeDefined();
    expect(res.id).toHaveLength(36);
    expect(res.full_name).toBe(seller.full_name);
    expect(res.phone).toBe(seller.phone);
    expect(res.email).toBe(seller.email);
    expect(res.password).toBe(seller.password);
    expect(res.avatarImage).toBe(seller.avatarImg);
  });

  it("should call Prisma with correct params", async () => {
    const sut = new PostgresCreateSellerRepository();

    const prismaSpy = jest.spyOn(prisma.seller, "create");

    await sut.execute(seller);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: expect.objectContaining({
        id: expect.any(String),
        full_name: seller.full_name,
        phone: seller.phone,
        email: seller.email,
        password: seller.password,
        cpf: seller.cpf,
        avatarImage: seller.avatarImg,
      }),
    });
  });
});
