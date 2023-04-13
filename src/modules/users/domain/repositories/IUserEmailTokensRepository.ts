import { IUserEmailToken } from '../models/IUserEmailToken';

export interface IUserEmailTokensRepository {
  findByToken(token: string): Promise<IUserEmailToken | null>;
  generateEmailToken(user_id: string): Promise<IUserEmailToken | null>;
}
