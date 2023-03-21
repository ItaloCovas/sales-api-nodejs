import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { compare, hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import {
  CreateUserDTO,
  ShowUserDTO,
  DeleteUserDTO,
  UpdateUserDTO,
  IUsersRepository,
  ShowProfileDTO,
  UpdateProfileDTO,
} from '../interfaces';
import User from '../typeorm/entities/User';

@injectable()
export class UsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async createUser({ name, email, password }: CreateUserDTO) {
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

  async listUsers(): Promise<Array<User>> {
    const users = await this.usersRepository.findAll();

    return users;
  }

  async showProfile({ userId }: ShowProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    return user;
  }

  async updateProfile({
    userId,
    name,
    email,
    password,
    old_password,
  }: UpdateProfileDTO): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new BadRequestError('There is already one user with this email.');
    }

    if (password && !old_password) {
      console.log(old_password);
      throw new BadRequestError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new BadRequestError('Old password does not match.');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.update(user);

    return user;
  }
}
