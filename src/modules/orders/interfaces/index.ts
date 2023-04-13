import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '../infra/typeorm/entities/Order';

export interface IProduct {
  product_id: string;
  price: number;
  amount: number;
}

export interface CreateOrderDTO {
  customer: Customer;
  products: Array<IProduct>;
  customer_id?: string;
}

export interface IOrdersRepository {
  create({ customer, products }: CreateOrderDTO): Promise<Order>;
  findById(id: string): Promise<Order | null>;
}
