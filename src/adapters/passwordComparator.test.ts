import { describe, expect, it } from "vitest";
import bcrypt from "bcrypt";

describe("passwordComparatorAdapter", () => {
  it("should return true if both passwords match", async () => {
    const password = await bcrypt.compare("1234", "1234");

    // return password;

    expect(password).toEqual(true);
  });
});
