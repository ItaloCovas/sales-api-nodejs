import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { IProduct } from '@modules/products/domain/models/IProduct';

export interface CreateOrderDTO {
  customer: Customer;
  products: Array<Partial<IProduct>>;
}

export interface CreateOrderServiceDTO {
  products: Array<IProduct>;
  customer_id: string;
}
