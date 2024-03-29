import { NotFoundError } from '@shared/helpers/ApiError';
import dataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { CreateRefreshTokenDTO } from '@modules/users/domain/models/IUserOperations';
import RefreshToken from '../entities/RefreshToken';
import { IRefreshTokenRepository } from '@modules/users/domain/repositories/IRefreshTokensRepository';

export class RefreshTokensRepository implements IRefreshTokenRepository {
  private repository: Repository<RefreshToken>;

  constructor() {
    this.repository = dataSource.getRepository(RefreshToken);
  }

  async create({
    expires,
    token,
    userId,
    valid,
  }: CreateRefreshTokenDTO): Promise<RefreshToken> {
    const refreshToken = this.repository.create({
      expires,
      token,
      user_id: userId,
      valid,
    });

    return this.repository.save(refreshToken);
  }

  async findByToken(token: string): Promise<RefreshToken | null> {
    return this.repository.findOneBy({ token });
  }

  async invalidate(refresh_token: RefreshToken): Promise<void> {
    const refreshToken = await this.findByToken(refresh_token.token);

    if (!refreshToken) {
      throw new NotFoundError('Refresh token not found.');
    }

    refreshToken.valid = false;

    await this.repository.save(refreshToken);
  }
}
