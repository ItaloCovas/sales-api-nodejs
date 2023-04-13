import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { IProduct } from '@modules/products/domain/models/IProduct';

export interface PaginationParams {
  page: number;
  skip: number;
  take: number;
}

export interface PaginationServices {
  page: number;
  limit: number;
}

export interface PaginationProperties {
  perPage: number;
  total: number;
  currentPage: number;
  data: Array<ICustomer | IProduct>;
}
