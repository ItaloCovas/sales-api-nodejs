import Product from '@modules/products/typeorm/entities/Product';
import User from '@modules/users/typeorm/entities/User';
import { DataSource } from 'typeorm';
import { CreateProductsTable1677523254347 } from './migrations/1677523254347-CreateProductsTable';
import { CreateUsers1678208821691 } from './migrations/1678208821691-CreateUsers';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sales-api-node',
  entities: [Product, User],
  migrations: [CreateProductsTable1677523254347, CreateUsers1678208821691],
});

export default dataSource;
