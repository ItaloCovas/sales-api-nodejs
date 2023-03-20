import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import {
  IUsersRepository,
  IUserEmailTokensRepository,
  SendForgotPasswordDTO,
  ForgotPasswordDTO,
} from '../interfaces';
import { NotFoundError, UnauthorizedError } from '@shared/helpers/ApiError';
import SendGridMail from '@config/mail/SendGridMail';

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

    await SendGridMail.sendMail({
      to: {
        email,
      },
      text: `Solicitação de redefinição de senha recebida: ${emailToken?.token}`,
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
