import Product from '@modules/products/typeorm/entities/Product';
import RefreshToken from '@modules/users/typeorm/entities/RefreshToken';
import User from '@modules/users/typeorm/entities/User';
import { DataSource } from 'typeorm';
import { CreateProductsTable1677523254347 } from './migrations/1677523254347-CreateProductsTable';
import { CreateUsers1678208821691 } from './migrations/1678208821691-CreateUsers';
import { CreateRefreshToken1678371554283 } from './migrations/1678371554283-CreateRefreshToken';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sales-api-node',
  entities: [Product, User, RefreshToken],
  migrations: [
    CreateProductsTable1677523254347,
    CreateUsers1678208821691,
    CreateRefreshToken1678371554283,
  ],
});

export default dataSource;
