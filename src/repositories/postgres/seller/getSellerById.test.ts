import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { PostgresGetSellerById } from "./getSellerById";
import { seller } from "../../../tests/fixtures/seller";
import { prisma } from "../../../../prisma/prisma";

describe("Get user by id repository", () => {
  beforeEach(async () => {
    await prisma.seller.deleteMany({});
  });

  it("should call prisma with correct parameters", async () => {
    const sut = new PostgresGetSellerById();

    const prismaSpy = jest.spyOn(prisma.seller, "findUnique");

    await sut.execute(seller.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: seller.id,
      },
    });
  });
});
