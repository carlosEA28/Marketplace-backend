export class CategoryAlreadyExistsError extends Error {
  constructor() {
    super("A categoria cadastrada já existe");
    this.name = "InvalidPasswordError";
  }
}
