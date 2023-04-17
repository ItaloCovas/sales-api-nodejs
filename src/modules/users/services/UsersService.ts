import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { injectable, inject } from 'tsyringe';
import {
  CreateUserDTO,
  ShowProfileDTO,
  UpdateProfileDTO,
} from '@modules/users/domain/models/IUserOperations';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export class UsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async createUser({ name, email, password }: CreateUserDTO): Promise<IUser> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestError('Email address already in use.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }

  async listUsers(): Promise<Array<IUser>> {
    const users = await this.usersRepository.findAll();

    return users;
  }

  async showProfile({ userId }: ShowProfileDTO): Promise<IUser> {
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
  }: UpdateProfileDTO): Promise<IUser> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const userUpdateEmail = await this.usersRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== userId) {
      throw new BadRequestError('There is already one user with this email.');
    }

    if (password && !old_password) {
      throw new BadRequestError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new BadRequestError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.update(user);

    return user;
  }
}
