import { NotFoundError } from '@shared/helpers/ApiError';
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import { IUsersRepository, UpdateUserAvatarDTO } from '../interfaces';
import uploadConfig from '@config/upload';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';
import {
  IDiskStorageProvider,
  IS3StorageProvider,
} from '@shared/providers/interfaces';

@injectable()
export class UsersAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('DiskStorageProvider')
    private diskStorageProvider: IDiskStorageProvider,
    @inject('S3StorageProvider')
    private s3StorageProvider: IS3StorageProvider,
  ) {}

  async updateUserAvatar({ userId, avatarFilename }: UpdateUserAvatarDTO) {
    const user = await this.usersRepository.findById(userId as string);

    if (!user) {
      throw new NotFoundError('User not found.');
    }

    if (uploadConfig.driver === 's3') {
      if (user.avatar) {
        await this.s3StorageProvider.deleteFile(user.avatar);
      }

      const fileName = await this.s3StorageProvider.saveFile(
        avatarFilename as string,
      );
      user.avatar = fileName;
    } else {
      if (user.avatar) {
        await this.diskStorageProvider.deleteFile(user.avatar);
      }

      const fileName = await this.diskStorageProvider.saveFile(
        avatarFilename as string,
      );
      user.avatar = fileName;
    }

    await this.usersRepository.update(user);

    return user;
  }
}
