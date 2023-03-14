import dataSource from '@shared/typeorm';
import { Repository } from 'typeorm';
import { IUserEmailTokensRepository } from '../interfaces';
import UserEmailToken from '../typeorm/entities/UserEmailToken';

export class UserEmailTokensRepository implements IUserEmailTokensRepository {
  private repository: Repository<UserEmailToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserEmailToken);
  }

  async findByToken(token: string): Promise<UserEmailToken | null> {
    const userToken = await this.repository.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  async generateEmailToken(user_id: string): Promise<UserEmailToken | null> {
    const userToken = await this.repository.create({
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
