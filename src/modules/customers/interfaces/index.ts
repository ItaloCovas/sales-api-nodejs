import Customer from '../typeorm/entities/Customer';

export interface ICustomersRepository {
  findByName(name: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
}
