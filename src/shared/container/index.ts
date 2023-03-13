import { container } from 'tsyringe';
import { IProductsRepository } from '@modules/products/interfaces';
import { ProductsRepository } from '@modules/products/repositories/ProductsRepository';
import { UsersRepository } from '@modules/users/repositories/UsersRepository';
import { ProductController } from '@modules/products/controllers/ProductController';
import {
  IRefreshTokenRepository,
  IUsersRepository,
} from '@modules/users/interfaces';
import { UserController } from '@modules/users/controllers/UserController';
import { LoginController } from '@modules/users/controllers/LoginController';
import { UserAvatarController } from '@modules/users/controllers/UserAvatarController';
import { RefreshTokensRepository } from '@modules/users/repositories/RefreshTokensRepository';
import { RefreshTokenController } from '@modules/users/controllers/RefreshTokenController';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokensRepository',
  RefreshTokensRepository,
);

container.registerSingleton('ProductController', ProductController);
container.registerSingleton('UserController', UserController);
container.registerSingleton('LoginController', LoginController);
container.registerSingleton('UserAvatarController', UserAvatarController);
container.registerSingleton('RefreshTokenController', RefreshTokenController);
