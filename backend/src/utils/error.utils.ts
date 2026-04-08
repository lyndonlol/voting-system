export class ApiError extends Error {
  public name: string = 'ApiError';
  public code: string;
  public statusCode: number;

  constructor(code: string, message: string, statusCode: number) {
    super(message);
    this.code = code;
    this.statusCode = statusCode ?? 500;
  }
}
