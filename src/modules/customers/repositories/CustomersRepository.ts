import dataSource from '@shared/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDTO, ICustomersRepository } from '../interfaces';
import Customer from '../typeorm/entities/Customer';

export class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  async create({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({ name, email });
    return await this.repository.save(customer);
  }

  async findAll(): Promise<Array<Customer>> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.repository.findOne({
      where: {
        name,
      },
    });
    return customer;
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = this.repository.findOne({ where: { id } });

    return customer;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.repository.findOne({ where: { email } });

    return customer;
  }

  async update(customer: Customer): Promise<Customer | null> {
    return this.repository.save(customer);
  }

  async delete(customer: Customer): Promise<void> {
    await this.repository.remove(customer);
  }
}
