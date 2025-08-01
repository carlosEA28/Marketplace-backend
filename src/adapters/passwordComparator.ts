import bcrypt from "bcrypt";

export class PasswordComparatorAdapter {
  async execute(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
