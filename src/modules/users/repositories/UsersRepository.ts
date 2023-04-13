import dataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO, IUsersRepository } from '../interfaces';
import User from '../infra/typeorm/entities/User';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, email, password });
    return await this.repository.save(user);
  }

  async findAll(): Promise<Array<User>> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.repository.findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.repository.findOne({ where: { email } });

    return user;
  }

  async update(user: User): Promise<User | null> {
    return this.repository.save(user);
  }

  // async delete(product: Product): Promise<void> {
  //   await this.repository.remove(product);
  // }
}
