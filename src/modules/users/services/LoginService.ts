import { BadRequestError } from '@shared/helpers/ApiError';
import jwtConfig from '@config/auth';
import { Secret, sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';
import {
  CreateLoginDTO,
  ILoginResponse,
} from '@modules/users/domain/models/IUserOperations';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IRefreshTokenRepository } from '../domain/repositories/IRefreshTokensRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
export class LoginService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('RefreshTokensRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async createLogin({
    email,
    password,
  }: CreateLoginDTO): Promise<ILoginResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Incorrect email/password.');
    }

    const passwordConfirm = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordConfirm) {
      throw new BadRequestError('Incorrect email/password.');
    }

    const accessToken = sign({}, jwtConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    });

    const expires = new Date(Date.now() + jwtConfig.refreshToken.duration);

    const refreshToken = sign({}, jwtConfig.refreshToken.secret as Secret, {
      subject: user.id,
      expiresIn: jwtConfig.refreshToken.expiresIn,
    });

    await this.refreshTokenRepository?.create({
      token: refreshToken,
      expires,
      userId: user.id,
      valid: true,
    });

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
}
