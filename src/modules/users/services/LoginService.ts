import { BadRequestError } from '@shared/helpers/ApiError';
import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { CreateLoginDTO, IUsersRepository } from '../interfaces';
import User from '../typeorm/entities/User';

@injectable()
export class LoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async createLoginService({ email, password }: CreateLoginDTO): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Incorrect email/password.');
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new BadRequestError('Incorrect email/password.');
    }

    return user;
  }
}
