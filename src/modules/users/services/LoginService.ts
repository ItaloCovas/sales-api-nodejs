import { BadRequestError } from '@shared/helpers/ApiError';
import { compare } from 'bcryptjs';
import jwtConfig from '@config/auth';
import { Secret, sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import {
  CreateLoginDTO,
  ILoginResponse,
  IUsersRepository,
} from '../interfaces';

@injectable()
export class LoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async createLoginService({
    email,
    password,
  }: CreateLoginDTO): Promise<ILoginResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Incorrect email/password.');
    }

    const passwordConfirm = await compare(password, user.password);

    if (!passwordConfirm) {
      throw new BadRequestError('Incorrect email/password.');
    }

    const token = sign({}, jwtConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
