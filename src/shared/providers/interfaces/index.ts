// Two interfaces were created because I don't know if in the future i'll use some other S3 features.

export interface IDiskStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}

export interface IS3StorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
