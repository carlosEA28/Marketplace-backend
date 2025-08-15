import { seller } from "../../../tests/fixtures/seller";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { PostgresCreateSellerRepository } from "./create_seller";
import { PostgresGetSellerByEmailRepository } from "./getSellerByEmail";
import { prisma } from "../../../../prisma/prisma";

describe("Get seller by id repository", () => {
  beforeEach(async () => {
    await prisma.seller.deleteMany({});
  });

  it("should get seller by email from db", async () => {
    const sellerRepository = new PostgresCreateSellerRepository();
    const newSeller = await sellerRepository.execute(seller);

    const sut = new PostgresGetSellerByEmailRepository();

    const res = await sut.execute(newSeller.email);

    expect(res?.email).toBe(newSeller.email);
  });
});
