import RefreshToken from '../typeorm/entities/RefreshToken';
import User from '../typeorm/entities/User';

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDTO {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface DeleteUserDTO {
  id: string;
}

export interface ShowUserDTO {
  id: string;
}

export interface CreateLoginDTO {
  email: string;
  password: string;
}

export interface ILoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface UpdateUserAvatarDTO {
  userId: string | (() => string) | undefined;
  avatarFilename: string | undefined;
}

export interface CreateRefreshTokenDTO {
  userId: string;
  token: string;
  expires: Date;
  valid: boolean;
}

export interface IUsersRepository {
  create({ name, email, password }: CreateUserDTO): Promise<User>;
  findAll(): Promise<Array<User>>;
  findByName(name: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(user: User): Promise<User | null>;
}

export interface IRefreshTokenRepository {
  create({
    expires,
    token,
    userId,
    valid,
  }: CreateRefreshTokenDTO): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  invalidate(refresh_token: RefreshToken): Promise<void>;
}
