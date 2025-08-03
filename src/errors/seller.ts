export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`O email ${email} já está em uso`);
    this.name = "EmailAlreadyInUse";
  }
}
export class UserNotFoundError extends Error {
  constructor() {
    super(`O usuário  não foi encontrado`);
    this.name = "UserNotFoundError";
  }
}

export class InvalidPasswordError extends Error {
  constructor() {
    super("A senha fornecida é inválida");
    this.name = "InvalidPasswordError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super(`Você não está autorizado a realizar esta ação`);
    this.name = "UnauthorizedError";
  }
}
