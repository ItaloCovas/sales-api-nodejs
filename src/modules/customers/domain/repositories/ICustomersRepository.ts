import { CreateCustomerDTO } from '@modules/customers/domain/models/ICostumerOperations';
import { ICustomer } from '../models/ICustomer';
import { PaginationParams, PaginationProperties } from '@shared/interfaces';

export interface ICustomersRepository {
  create({ name, email }: CreateCustomerDTO): Promise<ICustomer>;
  findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProperties>;
  findByName(name: string): Promise<ICustomer | null | undefined>;
  findByEmail(email: string): Promise<ICustomer | null | undefined>;
  findById(id: string): Promise<ICustomer | null | undefined>;
  update(customer: ICustomer): Promise<ICustomer | null>;
  delete(customer: ICustomer): Promise<void>;
}
