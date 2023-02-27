import dataSource from '@shared/typeorm';
import { Repository } from 'typeorm';
import Product from '../typeorm/entities/Product';

export class ProductsRepository {
  private repository: Repository<Product>;

  private constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({
      where: {
        name,
      },
    });

    return product;
  }
}
