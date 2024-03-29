import { CreateRefreshTokenDTO } from '@modules/users/domain/models/IUserOperations';
import { IRefreshToken } from '../models/IRefreshToken';

export interface IRefreshTokenRepository {
  create({
    expires,
    token,
    userId,
    valid,
  }: CreateRefreshTokenDTO): Promise<IRefreshToken>;
  findByToken(token: string): Promise<IRefreshToken | null>;
  invalidate(refresh_token: IRefreshToken): Promise<void>;
}
