import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/error.utils.ts';

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
    });
  }

  res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
  });
};
