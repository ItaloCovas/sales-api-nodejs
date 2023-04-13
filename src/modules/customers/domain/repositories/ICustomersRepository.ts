import {
  CreateCustomerDTO,
  PaginationParams,
  CustomersPaginationProperties,
} from '@modules/customers/interfaces';
import { ICustomer } from '../models/ICustomer';

export interface ICustomersRepository {
  create({ name, email }: CreateCustomerDTO): Promise<ICustomer>;
  findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<CustomersPaginationProperties>;
  findByName(name: string): Promise<ICustomer | null>;
  findByEmail(email: string): Promise<ICustomer | null>;
  findById(id: string): Promise<ICustomer | null>;
  update(customer: ICustomer): Promise<ICustomer | null>;
  delete(customer: ICustomer): Promise<void>;
}
