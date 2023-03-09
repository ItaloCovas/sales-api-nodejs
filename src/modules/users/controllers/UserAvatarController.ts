import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UsersAvatarService } from '../services/UsersAvatarService';

export class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const usersAvatarService = container.resolve(UsersAvatarService);

    const user = usersAvatarService.updateUserAvatarService({
      userId: request.user.id,
      avatarFilename: request.file?.filename,
    });

    return response.json(user);
  }
}
