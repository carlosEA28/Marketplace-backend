export class ProductAlreadyExistsError extends Error {
  constructor() {
    super("A senha fornecida é inválida");
    this.name = "InvalidPasswordError";
  }
}
