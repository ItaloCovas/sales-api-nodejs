import { DataSource } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import Product from '@modules/products/infra/typeorm/entities/Product';
import RefreshToken from '@modules/users/infra/typeorm/entities/RefreshToken';
import User from '@modules/users/infra/typeorm/entities/User';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import UserEmailToken from '@modules/users/infra/typeorm/entities/UserEmailToken';

import { CreateProductsTable1677523254347 } from './migrations/1677523254347-CreateProductsTable';
import { CreateUsers1678208821691 } from './migrations/1678208821691-CreateUsers';
import { CreateRefreshToken1678371554283 } from './migrations/1678371554283-CreateRefreshToken';
import { CreateUserEmailTokens1678821650422 } from './migrations/1678821650422-CreateUserEmailTokens';
import { CreateCustomers1680092968014 } from './migrations/1680092968014-CreateCustomers';
import { CreateOrders1680201387455 } from './migrations/1680201387455-CreateOrders';
import { AddCostumerIdToOrders1680201551447 } from './migrations/1680201551447-AddCostumerIdToOrders';
import { CreateOrdersProducts1680202122414 } from './migrations/1680202122414-CreateOrdersProducts';
import { AddProductIdToOrdersProducts1680204823794 } from './migrations/1680204823794-AddProductIdToOrdersProducts';
import { AddOrderIdToOrdersProducts1680205703980 } from './migrations/1680205703980-AddOrderIdToOrdersProducts';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'sales-api-node',
  entities: [
    Product,
    User,
    RefreshToken,
    UserEmailToken,
    Customer,
    Order,
    OrdersProducts,
  ],
  migrations: [
    CreateProductsTable1677523254347,
    CreateUsers1678208821691,
    CreateRefreshToken1678371554283,
    CreateUserEmailTokens1678821650422,
    CreateCustomers1680092968014,
    CreateOrders1680201387455,
    AddCostumerIdToOrders1680201551447,
    CreateOrdersProducts1680202122414,
    AddOrderIdToOrdersProducts1680205703980,
    AddProductIdToOrdersProducts1680204823794,
  ],
});

export default dataSource;
