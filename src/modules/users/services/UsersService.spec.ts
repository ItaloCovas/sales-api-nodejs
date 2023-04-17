import 'reflect-metadata';
import { UsersService } from './UsersService';
import { MockedUsersRepository } from '../domain/repositories/mocks/MockedUsersRepository';
import { ApiError } from '@shared/helpers/ApiError';
import { MockedHashProvider } from '../providers/HashProvider/mocks/MockedHashProvider';

let mockedUsersRepository: MockedUsersRepository;
let usersService: UsersService;
let hashProvider: MockedHashProvider;

describe('UsersService', () => {
  beforeEach(() => {
    mockedUsersRepository = new MockedUsersRepository();
    hashProvider = new MockedHashProvider();
    usersService = new UsersService(mockedUsersRepository, hashProvider);
  });
  it('should be able to create a new user', async () => {
    const user = await usersService.createUser({
      name: 'Usuario teste',
      email: 'teste@teste.com',
      password: '12345',
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users with the same email', async () => {
    await usersService.createUser({
      name: 'Usuario teste',
      email: 'teste@teste.com',
      password: '12345',
    });

    expect(
      usersService.createUser({
        name: 'Cliente um',
        email: 'teste@teste.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
