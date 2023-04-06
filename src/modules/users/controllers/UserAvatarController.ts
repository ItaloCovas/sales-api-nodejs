import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';
import { UsersAvatarService } from '../services/UsersAvatarService';

export class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const usersAvatarService = container.resolve(UsersAvatarService);

    const user = await usersAvatarService.updateUserAvatar({
      userId: request.user.id,
      avatarFilename: request.file?.filename,
    });

    return response.json(instanceToInstance(user));
  }
}
