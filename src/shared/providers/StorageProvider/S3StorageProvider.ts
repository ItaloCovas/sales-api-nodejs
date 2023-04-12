import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import crypto from 'crypto';

import uploadConfig from '@config/upload';
import { IS3StorageProvider } from '../interfaces';
import { NotFoundError } from '@shared/helpers/ApiError';

export class S3StorageProvider implements IS3StorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: process.env.AWS_REGION,
    });
  }

  async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileHash = crypto.randomBytes(10).toString('hex');
    const fileKey = `${file}-${fileHash}`;

    const fileType = path.extname(originalPath);

    if (!fileType) {
      throw new NotFoundError('File not found.');
    }

    const fileContent = await fs.promises.readFile(originalPath);

    await this.client
      .putObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: fileKey,
        ACL: 'private',
        Body: fileContent,
        ContentType: fileType,
      })
      .promise();

    const params = {
      Bucket: 'sales-api-s3-bucket',
      Key: fileKey,
      Expires: null,
    };

    const url = this.client.getSignedUrl('getObject', params);

    await fs.promises.unlink(originalPath);

    return url;
  }

  async deleteFile(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: uploadConfig.config.aws.bucket,
        Key: file,
      })
      .promise();
  }
}
