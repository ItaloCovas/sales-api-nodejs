import { ICustomer } from './ICustomer';

export interface CreateCustomerDTO {
  name: string;
  email: string;
}

export interface ShowCustomerDTO {
  customerId: string;
}

export interface UpdateCustomerDTO {
  customerId: string;
  name: string;
  email: string;
}

export interface DeleteCustomerDTO {
  customerId: string;
}

export interface CustomersPaginationParams {
  page: number;
  limit: number;
}

export interface PaginationParams {
  page: number;
  skip: number;
  take: number;
}

export interface CustomersPaginationProperties {
  perPage: number;
  total: number;
  currentPage: number;
  data: Array<ICustomer>;
}
