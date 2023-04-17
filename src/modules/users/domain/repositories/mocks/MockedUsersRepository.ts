import { v4 as uuidv4 } from 'uuid';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import { CreateUserDTO } from '../../models/IUserOperations';

export class MockedUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = new User();

    user.id = uuidv4();
    user.name = name;
    user.email = email;
    user.password = password;

    this.users.push(user);

    return user;
  }

  update(user: User): Promise<User | null | undefined> {
    throw new Error('Method not implemented.');
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findByName(name: string): Promise<User | undefined> {
    const user = this.users.find(user => user.name === name);
    return user;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(user => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(user => user.email === email);
    return user;
  }
}
