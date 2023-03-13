import { inject, injectable } from 'tsyringe';

import jwtConfig from '@config/auth';
import { NotFoundError, UnauthorizedError } from '@shared/helpers/ApiError';
import {
  CreateAccessAndRefreshTokenDTO,
  IRefreshTokenRepository,
  IRefreshTokenResponse,
  IUsersRepository,
} from '../interfaces';
import { Secret, sign } from 'jsonwebtoken';

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RefreshTokensRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  async createRefreshTokenService({
    userId,
    refresh_token,
  }: CreateAccessAndRefreshTokenDTO): Promise<IRefreshTokenResponse> {
    const user = await this.usersRepository.findById(userId as string);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const refreshTokenExists = await this.refreshTokenRepository.findByToken(
      refresh_token,
    );

    if (!refreshTokenExists) {
      throw new UnauthorizedError('Refresh token is required.');
    }

    const dateNow = new Date().getTime();

    if (
      !refreshTokenExists?.valid ||
      refreshTokenExists.expires.getTime() < dateNow
    ) {
      throw new UnauthorizedError('Refresh is invalid/expired.');
    }

    await this.refreshTokenRepository.invalidate(refreshTokenExists);

    // Creating new refresh and access tokens

    const accessToken = sign({}, jwtConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);

    const refreshToken = sign({}, jwtConfig.refreshToken.secret as Secret, {
      subject: user.id,
      expiresIn: jwtConfig.refreshToken.expiresIn,
    });

    await this.refreshTokenRepository.create({
      token: refreshToken,
      expires,
      userId: user.id,
      valid: true,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
