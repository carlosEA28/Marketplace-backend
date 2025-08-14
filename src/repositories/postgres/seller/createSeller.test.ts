import { PostgresCreateSellerRepository } from "./create_seller";
import { faker } from "@faker-js/faker";
import { prisma } from "../../../../prisma/prisma";
import { describe, expect, it, beforeEach } from "@jest/globals";
import { seller } from "../../../tests/fixtures/seller";

describe("Create user repository", () => {
  beforeEach(async () => {
    await prisma.seller.deleteMany({});
  });

  it("should create a user on db", async () => {
    const sut = new PostgresCreateSellerRepository();

    const res = await sut.execute(seller);

    expect(res).toBeTruthy();
  });
});
