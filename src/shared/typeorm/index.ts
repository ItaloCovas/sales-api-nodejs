import Customer from '@modules/customers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import RefreshToken from '@modules/users/typeorm/entities/RefreshToken';
import User from '@modules/users/typeorm/entities/User';
import UserEmailToken from '@modules/users/typeorm/entities/UserEmailToken';
import { DataSource } from 'typeorm';
import { CreateProductsTable1677523254347 } from './migrations/1677523254347-CreateProductsTable';
import { CreateUsers1678208821691 } from './migrations/1678208821691-CreateUsers';
import { CreateRefreshToken1678371554283 } from './migrations/1678371554283-CreateRefreshToken';
import { CreateUserEmailTokens1678821650422 } from './migrations/1678821650422-CreateUserEmailTokens';
import { CreateCustomers1680092968014 } from './migrations/1680092968014-CreateCustomers';
import { CreateOrders1680201387455 } from './migrations/1680201387455-CreateOrders';
import { AddCostumerIdToOrders1680201551447 } from './migrations/1680201551447-AddCostumerIdToOrders';
import { CreateOrdersProducts1680202122414 } from './migrations/1680202122414-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1680202250836 } from './migrations/1680202250836-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1680202534365 } from './migrations/1680202534365-AddProductIdToOrdersProducts';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sales-api-node',
  entities: [Product, User, RefreshToken, UserEmailToken, Customer],
  migrations: [
    CreateProductsTable1677523254347,
    CreateUsers1678208821691,
    CreateRefreshToken1678371554283,
    CreateUserEmailTokens1678821650422,
    CreateCustomers1680092968014,
    CreateOrders1680201387455,
    AddCostumerIdToOrders1680201551447,
    CreateOrdersProducts1680202122414,
    AddOrderIdToOrdersProducts1680202250836,
    AddProductIdToOrdersProducts1680202534365,
  ],
});

export default dataSource;
