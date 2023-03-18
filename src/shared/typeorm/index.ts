import Product from '@modules/products/typeorm/entities/Product';
import RefreshToken from '@modules/users/typeorm/entities/RefreshToken';
import User from '@modules/users/typeorm/entities/User';
import UserEmailToken from '@modules/users/typeorm/entities/UserEmailToken';
import { DataSource } from 'typeorm';
import { CreateProductsTable1677523254347 } from './migrations/1677523254347-CreateProductsTable';
import { CreateUsers1678208821691 } from './migrations/1678208821691-CreateUsers';
import { CreateRefreshToken1678371554283 } from './migrations/1678371554283-CreateRefreshToken';
import { CreateUserEmailTokens1678821650422 } from './migrations/1678821650422-CreateUserEmailTokens';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sales-api-node',
  entities: [Product, User, RefreshToken, UserEmailToken],
  migrations: [
    CreateProductsTable1677523254347,
    CreateUsers1678208821691,
    CreateRefreshToken1678371554283,
    CreateUserEmailTokens1678821650422,
  ],
});

export default dataSource;
