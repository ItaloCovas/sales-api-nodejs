import { Request, Response, NextFunction } from 'express';
import Redis from 'ioredis';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { RateLimiterError } from '@shared/helpers/ApiError';

export const rateLimiter = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const redisClient = new Redis({
      password: process.env.REDIS_PASSWORD || undefined,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });

    const limiter = new RateLimiterRedis({
      storeClient: redisClient,
      keyPrefix: 'ratelimit',
      points: 5,
      duration: 1,
    });

    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new RateLimiterError('Too many requests.');
  }
};
