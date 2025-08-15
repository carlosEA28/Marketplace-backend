import { seller } from "../../../tests/fixtures/seller";
import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { PostgresCreateSellerRepository } from "./create_seller";
import { PostgresGetSellerByEmailRepository } from "./getSellerByEmail";
import { prisma } from "../../../../prisma/prisma";

const createSeller = async () => {
  const sellerRepository = new PostgresCreateSellerRepository();
  const newSeller = await sellerRepository.execute(seller);

  return newSeller;
};

describe("Get seller by Email repository", () => {
  beforeEach(async () => {
    await prisma.seller.deleteMany({});
  });

  it("should get seller by email from db", async () => {
    const newSeller = createSeller();
    const sut = new PostgresGetSellerByEmailRepository();

    const res = await sut.execute((await newSeller).email);

    expect(res?.email).toBe((await newSeller).email);
  });

  it("should call Prisma with the correct params", async () => {
    const sut = new PostgresGetSellerByEmailRepository();

    const prismaSpy = jest.spyOn(prisma.seller, "findUnique");

    await sut.execute(seller.email);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        email: seller.email,
      },
    });
  });

  it("should return null if the email does not exist", async () => {
    const sut = new PostgresGetSellerByEmailRepository();
    const res = await sut.execute("emailnaoexistente@example.com");

    expect(res).toBeNull();
  });

  it("should return null if the email is an empty string", async () => {
    const sut = new PostgresGetSellerByEmailRepository();
    const res = await sut.execute("");

    expect(res).toBeNull();
  });
});
