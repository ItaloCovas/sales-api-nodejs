import { BadRequestError } from '@shared/helpers/ApiError';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import {
  CreateUserDTO,
  ShowUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  IUsersRepository,
} from '../interfaces';
import User from '../typeorm/entities/User';

@injectable()
export class UsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async createUserService({ name, email, password }: CreateUserDTO) {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestError('Email address already in use.');
    }

    const hashedPassword = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async listUsersService(): Promise<Array<User>> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
