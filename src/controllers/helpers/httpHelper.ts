// badRequest - Para erros de validação do cliente (ex: dados incompletos)
export const badRequest = (
  body: Error | object
): { statusCode: 400; body: Error | object } => {
  return {
    statusCode: 400,
    body,
  };
};

// created - Para a criação bem-sucedida de um novo recurso
export const created = (
  body: object | null
): { statusCode: 201; body: object | null } => {
  return {
    statusCode: 201,
    body,
  };
};

// serverError - Para erros internos do servidor (não visíveis ao cliente)
export const serverError = (
  body: Error | string
): { statusCode: 500; body: Error | string } => {
  return {
    statusCode: 500,
    body,
  };
};

// ok - Para respostas bem-sucedidas com conteúdo (ex: buscar dados)
export const ok = (
  body: object | string
): { statusCode: 200; body: object | string } => {
  return {
    statusCode: 200,
    body,
  };
};

// noContent - Para respostas bem-sucedidas sem conteúdo (ex: exclusão)
export const noContent = (): { statusCode: 204; body: null } => {
  return {
    statusCode: 204,
    body: null,
  };
};
