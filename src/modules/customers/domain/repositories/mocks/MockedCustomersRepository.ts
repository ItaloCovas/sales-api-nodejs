import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerDTO } from '@modules/customers/domain/models/ICostumerOperations';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomersRepository } from '../ICustomersRepository';
import { PaginationParams, PaginationProperties } from '@shared/interfaces';
import { ICustomer } from '../../models/ICustomer';

export class MockedCustomersRepository implements ICustomersRepository {
  private customers: Array<Customer> = [];

  findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProperties> {
    throw new Error('Method not implemented.');
  }
  delete(customer: ICustomer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async create({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  async update(customer: Customer): Promise<Customer | null> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }
  async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
  async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }
}
