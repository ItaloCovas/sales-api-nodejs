import dataSource from '@shared/typeorm';
import { Repository } from 'typeorm';
import {
  CreateProductDTO,
  IProductsRepository,
  UpdateProductDTO,
} from '../interfaces';
import Product from '../typeorm/entities/Product';

export class ProductsRepository implements IProductsRepository {
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

  public async findAll(): Promise<Array<Product>> {
    return this.repository.find();
  }

  public async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findById(id: string): Promise<Product | null> {
    const product = this.repository.findOne({ where: { id } });

    return product;
  }

  public async update(product: Product): Promise<Product | null> {
    return this.repository.save(product);
  }

  async delete(product: Product): Promise<void> {
    await this.repository.remove(product);
  }
}
