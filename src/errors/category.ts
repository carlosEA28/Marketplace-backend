export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super("A categoria cadastrada já existe");
    this.name = "InvalidPasswordError";
  }
}
export class CategoryNotFoundError extends Error {
  constructor() {
    super("A categoria não foi encontrada");
    this.name = "CategoryNotFoundError";
  }
}
