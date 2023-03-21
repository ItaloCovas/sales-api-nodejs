import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UsersService } from '../services/UsersService';

export class ProfileController {
  async show(request: Request, response: Response): Promise<Response> {
    const usersService = container.resolve(UsersService);

    const userId = request.user.id as string;

    const user = await usersService.showProfile({ userId });

    return response.json(user);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const usersService = container.resolve(UsersService);

    const userId = request.user.id as string;
    const { name, email, password, old_password } = request.body;

    const user = await usersService.updateProfile({
      userId,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
