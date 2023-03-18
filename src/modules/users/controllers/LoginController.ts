import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { LoginService } from '../services/LoginService';

export class LoginController {
  async create(request: Request, response: Response): Promise<Response> {
    const loginService = container.resolve(LoginService);

    const { email, password } = request.body;

    const { user, accessToken, refreshToken } = await loginService.createLogin({
      email,
      password,
    });

    return response.json({
      user,
      accessToken,
      refreshToken,
    });
  }
}
