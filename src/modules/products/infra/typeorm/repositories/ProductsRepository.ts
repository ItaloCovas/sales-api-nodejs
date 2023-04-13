import dataSource from '@shared/infra/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDTO } from '@modules/products/domain/models/IProductOperations';
import Product from '../entities/Product';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { PaginationParams, PaginationProperties } from '@shared/interfaces';

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  async create({ name, price, amount }: CreateProductDTO): Promise<Product> {
    const product = this.repository.create({ name, price, amount });
    return await this.repository.save(product);
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProperties> {
    const [products, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      perPage: take,
      total: count,
      currentPage: page,
      data: products,
    };

    return result;
  }

  async findAllByIds(products: Array<IProduct>): Promise<Array<Product>> {
    const productIds = products.map(product => product.id);

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
