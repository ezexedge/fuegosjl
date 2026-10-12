export class ServiceError extends Error {
  constructor(
    message: string,
    public readonly status: number = 400,
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export const notFound = (what: string) => new ServiceError(`${what} no encontrado`, 404);
export const conflict = (message: string) => new ServiceError(message, 409);
