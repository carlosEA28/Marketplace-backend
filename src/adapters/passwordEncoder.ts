import bcrypt from "bcrypt";

export class PasswordEncoderAdapter {
  async execute(password: string) {
    return bcrypt.hash(password, 8);
  }
}
