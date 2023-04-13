import { IProduct } from '@modules/products/domain/models/IProduct';
import { IOrder } from './IOrder';

export interface IOrdersProducts {
  id: string;
  order: IOrder;
  product: IProduct;
  order_id: string;
  product_id: string;
  price: number;
  amount: number;
  created_at: Date;
  updated_at: Date;
}
