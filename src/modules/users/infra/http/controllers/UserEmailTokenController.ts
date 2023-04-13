import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UserEmailTokenService } from '../../../services/UserEmailTokenService';

export class UserEmailTokenController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const userEmailTokenService = container.resolve(UserEmailTokenService);

    await userEmailTokenService.sendForgotPasswordEmail({
      email,
    });

    return response.status(204).json();
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const userEmailTokenService = container.resolve(UserEmailTokenService);

    await userEmailTokenService.resetPassword({
      password,
      token,
    });

    return response.status(204).json();
  }
}
