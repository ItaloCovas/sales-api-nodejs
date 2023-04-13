import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import { IOrdersProducts } from './IOrdersProducts';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

export interface IOrder {
  id: string;
  customer: ICustomer;
  order_products: Array<IOrdersProducts> | Array<OrdersProducts>;
  created_at: Date;
  updated_at: Date;
}
