import path from 'path';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import {
  SendForgotPasswordDTO,
  ForgotPasswordDTO,
} from '@modules/users/domain/models/IUserOperations';
import { NotFoundError, UnauthorizedError } from '@shared/helpers/ApiError';
import SendGridMail from '@config/mail/SendGridMail';
import SESMail from '@config/mail/SESMail';
import mailConfig from '@config/mail/mail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserEmailTokensRepository } from '../domain/repositories/IUserEmailTokensRepository';

@injectable()
export class UserEmailTokenService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UserEmailTokensRepository')
    private userEmailTokensRepository: IUserEmailTokensRepository,
  ) {}

  async sendForgotPasswordEmail({
    email,
  }: SendForgotPasswordDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const emailToken = await this.userEmailTokensRepository.generateEmailToken(
      user.id,
    );

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    if (mailConfig.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          address: user.email,
          name: user.name,
        },
        subject: 'Recuperação de senha - API Vendas',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `http://localhost:3000/reset-password?token=${emailToken?.token}`,
          },
        },
      });
      return;
    }

    await SendGridMail.sendMail({
      to: {
        email,
      },
      subject: 'Recuperação de senha - API Vendas',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${emailToken?.token}`,
        },
      },
    });
  }

  async resetPassword({ token, password }: ForgotPasswordDTO) {
    const userToken = await this.userEmailTokensRepository.findByToken(token);

    if (!userToken) {
      throw new NotFoundError('User token not found.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new UnauthorizedError('Token expired.');
    }

    user.password = await hash(password, 8);

    await this.usersRepository.update(user);
  }
}
