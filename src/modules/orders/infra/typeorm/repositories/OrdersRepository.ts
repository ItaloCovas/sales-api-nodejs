import dataSource from '@shared/infra/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDTO } from '../../../interfaces';
import Order from '../entities/Order';
import { IOrdersRepository } from '@modules/orders/domain/repositories/IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = dataSource.getRepository(Order);
  }

  async create({ customer, products }: CreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      customer,
      order_products: products,
    });

    await this.repository.save(order);

    return order;
  }

  public async findById(id: string): Promise<Order | null> {
    const order = this.repository.findOne({
      where: { id },
      relations: ['order_products', 'customer'],
    });

    return order;
  }
}
