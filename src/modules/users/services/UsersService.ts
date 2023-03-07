import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
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

    const user = this.usersRepository.create({
      name,
      email,
      password,
    });

    return user;
  }

  async listUsersService(): Promise<Array<User>> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}
