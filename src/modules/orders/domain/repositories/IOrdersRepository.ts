import { CreateOrderDTO } from '@modules/orders/interfaces';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
  create({ customer, products }: CreateOrderDTO): Promise<IOrder>;
  findById(id: string): Promise<IOrder | null>;
}
