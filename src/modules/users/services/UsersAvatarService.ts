import { NotFoundError } from '@shared/helpers/ApiError';
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository, UpdateUserAvatarDTO } from '../interfaces';
import uploadConfig from '@config/upload';

@injectable()
export class UsersAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async updateUserAvatar({ userId, avatarFilename }: UpdateUserAvatarDTO) {
    const user = await this.usersRepository.findById(userId as string);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename as string;

    await this.usersRepository.update(user);

    return user;
  }
}
