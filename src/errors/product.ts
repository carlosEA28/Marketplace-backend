export class ProductAlreadyExistsError extends Error {
  constructor() {
    super("A senha fornecida é inválida");
    this.name = "InvalidPasswordError";
  }
}
export class ProductNotFoundError extends Error {
  constructor() {
    super("Produto não encontrado");
    this.name = "ProductNotFoundError";
  }
}
