import dataSource from '@shared/typeorm';
import { In, Repository } from 'typeorm';
import {
  CreateProductDTO,
  IProductsRepository,
  UpdateProductDTO,
} from '../interfaces';
import Product from '../typeorm/entities/Product';
import { IProduct } from '@modules/orders/interfaces';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async create({ name, price, amount }: CreateProductDTO): Promise<Product> {
    const product = this.repository.create({ name, price, amount });
    return await this.repository.save(product);
  }

  async findAll(): Promise<Array<Product>> {
    return this.repository.find();
  }

  async findAllByIds(products: Array<IProduct>): Promise<Array<Product>> {
    const productIds = products.map(product => product.product_id);

    const existentProducts = await this.repository.find({
      where: {
        id: In(productIds),
      },
    });

    return existentProducts;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.repository.findOne({ where: { id } });

    return product;
  }

  async update(product: Product): Promise<Product | null> {
    return this.repository.save(product);
  }

  async delete(product: Product): Promise<void> {
    await this.repository.remove(product);
  }
}
