import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IProduct } from '@modules/products/domain/models/IProduct';

export interface CreateOrderDTO {
  customer: ICustomer;
  products: Array<Partial<IProduct>>;
}

export interface CreateOrderServiceDTO {
  products: Array<IProduct>;
  customer_id: string;
}
