import { container } from 'tsyringe';
import { IProductsRepository } from '@modules/products/interfaces';
import { ProductsRepository } from '@modules/products/repositories/ProductsRepository';
import { UsersRepository } from '@modules/users/repositories/UsersRepository';
import { ProductController } from '@modules/products/infra/http/controllers/ProductController';
import {
  IRefreshTokenRepository,
  IUserEmailTokensRepository,
  IUsersRepository,
} from '@modules/users/interfaces';
import { UserController } from '@modules/users/infra/http/controllers/UserController';
import { LoginController } from '@modules/users/infra/http/controllers/LoginController';
import { UserAvatarController } from '@modules/users/infra/http/controllers/UserAvatarController';
import { RefreshTokensRepository } from '@modules/users/repositories/RefreshTokensRepository';
import { RefreshTokenController } from '@modules/users/infra/http/controllers/RefreshTokenController';
import { UserEmailTokensRepository } from '@modules/users/repositories/UserEmailTokensRepository';
import { UserEmailTokenController } from '@modules/users/infra/http/controllers/UserEmailTokenController';
import { ProfileController } from '@modules/users/infra/http/controllers/ProfileController';
import { ICustomersRepository } from '@modules/customers/interfaces';
import { CustomersRepository } from '@modules/customers/repositories/CustomersRepository';
import { CustomerController } from '@modules/customers/infra/http/controllers/CustomerController';
import { OrdersRepository } from '@modules/orders/repositories/OrdersRepository';
import { IOrdersRepository } from '@modules/orders/interfaces';
import { OrderController } from '@modules/orders/infra/http/controllers/OrderController';
import { IRedisCache, RedisCache } from '@shared/cache/RedisCache';
import { DiskStorageProvider } from '@shared/providers/StorageProvider/DiskStorageProvider';
import {
  IDiskStorageProvider,
  IS3StorageProvider,
} from '@shared/providers/interfaces';
import { S3StorageProvider } from '@shared/providers/StorageProvider/S3StorageProvider';

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

container.registerSingleton<IUserEmailTokensRepository>(
  'UserEmailTokensRepository',
  UserEmailTokensRepository,
);

container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository,
);

container.registerSingleton<IDiskStorageProvider>(
  'DiskStorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IS3StorageProvider>(
  'S3StorageProvider',
  S3StorageProvider,
);

container.registerSingleton('ProductController', ProductController);
container.registerSingleton('UserController', UserController);
container.registerSingleton('LoginController', LoginController);
container.registerSingleton('UserAvatarController', UserAvatarController);
container.registerSingleton('RefreshTokenController', RefreshTokenController);
container.registerSingleton(
  'UserEmailTokenController',
  UserEmailTokenController,
);
container.registerSingleton('ProfileController', ProfileController);
container.registerSingleton('CustomerController', CustomerController);
container.registerSingleton('OrderController', OrderController);
container.registerSingleton<IRedisCache>('RedisCache', RedisCache);
