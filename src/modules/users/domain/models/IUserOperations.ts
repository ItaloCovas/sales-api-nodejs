import { IUser } from './IUser';

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
  user: IUser;
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

export interface CreateAccessAndRefreshTokenDTO {
  userId: string | (() => string) | undefined;
  refresh_token: string;
}

export interface SendForgotPasswordDTO {
  email: string;
}

export interface ForgotPasswordDTO {
  token: string;
  password: string;
}

export interface ShowProfileDTO {
  userId: string;
}

export interface UpdateProfileDTO {
  userId: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export interface IRefreshTokenResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
