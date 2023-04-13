import { CreateUserDTO } from '@modules/users/interfaces';
import { IUser } from '../models/IUser';

export interface IUsersRepository {
  create({ name, email, password }: CreateUserDTO): Promise<IUser>;
  findAll(): Promise<Array<IUser>>;
  findByName(name: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  findById(id: string): Promise<IUser | null>;
  update(user: IUser): Promise<IUser | null>;
}
