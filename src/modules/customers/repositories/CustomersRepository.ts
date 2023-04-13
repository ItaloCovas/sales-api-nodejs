import dataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import {
  CostumersPaginationProperties,
  CreateCustomerDTO,
  ICustomersRepository,
  PaginationParams,
} from '../interfaces';
import Customer from '../infra/typeorm/entities/Customer';

export class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  async create({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({ name, email });
    return await this.repository.save(customer);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<CostumersPaginationProperties> {
    const [costumers, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      perPage: take,
      total: count,
      currentPage: page,
      data: costumers,
    };

    return result;
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
