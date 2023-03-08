import { UnauthorizedError } from '@shared/helpers/ApiError';
import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import jwtConfig from '@config/auth';
import { Secret } from 'jsonwebtoken';

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError('Invalid or missing token.');
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    throw new UnauthorizedError('Invalid access token.');
  }

  try {
    const decodedToken = verify(token, jwtConfig.jwt.secret as Secret);

    return next();
  } catch (err) {
    throw new UnauthorizedError('Token is expired.');
  }
};
