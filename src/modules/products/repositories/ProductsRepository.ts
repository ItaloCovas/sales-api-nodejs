import dataSource from '@shared/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDTO, IProductsRepository } from '../interfaces';
import Product from '../typeorm/entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    amount,
  }: CreateProductDTO): Promise<Product> {
    const product = this.repository.create({ name, price, amount });

    return await this.repository.save(product);
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

export default new ProductsRepository();
