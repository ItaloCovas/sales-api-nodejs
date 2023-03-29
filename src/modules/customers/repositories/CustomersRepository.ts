import dataSource from '@shared/typeorm';
import { Repository } from 'typeorm';
import { ICustomersRepository } from '../interfaces';
import Customer from '../typeorm/entities/Customer';

export class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = dataSource.getRepository(Customer);
  }

  async findByName(name: string): Promise<Customer | null> {
    const user = await this.repository.findOne({
      where: {
        name,
      },
    });
    return user;
  }

  async findById(id: string): Promise<Customer | null> {
    const user = this.repository.findOne({ where: { id } });

    return user;
  }

  async findByEmail(email: string): Promise<Customer | null> {
    const user = this.repository.findOne({ where: { email } });

    return user;
  }
}
