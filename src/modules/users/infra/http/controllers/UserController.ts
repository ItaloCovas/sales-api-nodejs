import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { UsersService } from '../../../services/UsersService';

export class UserController {
  async index(request: Request, response: Response): Promise<Response> {
    const usersService = container.resolve(UsersService);

    const users = await usersService.listUsers();

    return response.status(200).json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const usersService = container.resolve(UsersService);

    const { name, email, password } = request.body;

    const user = await usersService.createUser({
      name,
      email,
      password,
    });

    return response.status(201).json(instanceToInstance(user));
  }
}
