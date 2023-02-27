import Product from '@modules/products/typeorm/entities/Product';
import { DataSource } from 'typeorm';
import { CreateProductsTable1677523254347 } from './migrations/1677523254347-CreateProductsTable';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sales-api-node',
  entities: [Product],
  migrations: [CreateProductsTable1677523254347],
});

export default dataSource;
