import { verify, Secret } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import jwtConfig from '@config/auth';

export const authMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token expired.',
    });
  }

  const token = authHeader.replace('Bearer ', '');

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Access token expired.',
    });
  }

  try {
    const decodedToken = verify(token, jwtConfig.jwt.secret as Secret);

    const { sub } = decodedToken;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    return response.status(401).json({
      error: true,
      code: 'token.expired',
      message: 'Access token expired.',
    });
  }
};
