import { IHashProvider } from '../models/IHashProvider';

export class MockedHashProvider implements IHashProvider {
  async generateHash(payload: string): Promise<string> {
    return payload;
  }
  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return payload === hashed;
  }
}
