import { IOrdersProducts } from '@modules/orders/domain/models/IOrdersProducts';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';

export interface IProduct {
  id: string;
  order_products: Array<IOrdersProducts> | Array<OrdersProducts>;
  name: string;
  price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
