import { CreateUserDTO } from '@modules/users/domain/models/IUserOperations';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  create({ name, email, password }: CreateUserDTO): Promise<IUser>;
  findAll(): Promise<Array<IUser>>;
  findByName(name: string): Promise<IUser | null | undefined>;
  findByEmail(email: string): Promise<IUser | null | undefined>;
  findById(id: string): Promise<IUser | null | undefined>;
  update(user: IUser): Promise<IUser | null | undefined>;
}
