import { ApiError } from '@shared/helpers/ApiError';
import { NextFunction, Request, Response } from 'express';

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Internal Server Error';
  return res.status(statusCode).json({ message });
};
