import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { injectable, inject } from 'tsyringe';
import {
  CreateProductDTO,
  DeleteProductDTO,
  IProductsRepository,
  ShowProductDTO,
  UpdateProductDTO,
} from '../interfaces';
import Product from '../infra/typeorm/entities/Product';
import { IRedisCache } from '@shared/cache/RedisCache';
@injectable()
export class ProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('RedisCache')
    private redisCache: IRedisCache,
  ) {}

  async createProductService({ name, price, amount }: CreateProductDTO) {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new BadRequestError('This product already exists.');
    }

    await this.redisCache.invalidate('sales-api-products-list');

    return this.productsRepository.create({
      name,
      price,
      amount,
    });
  }

  async listProductsService(): Promise<Array<Product>> {
    let products = await this.redisCache.recover<Array<Product>>(
      'sales-api-products-list',
    );

    if (!products || products.length === 0) {
      products = await this.productsRepository.findAll();

      await this.redisCache.save('sales-api-products-list', products);
    }

    return products;
  }

  async showProductService({ id }: ShowProductDTO): Promise<Product | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found.');
    }

    return product;
  }

  async updateProductService({
    id,
    name,
    price,
    amount,
  }: UpdateProductDTO): Promise<Product | null> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && product.name !== name) {
      throw new BadRequestError('This product already exists.');
    }

    product.name = name;
    product.price = price;
    product.amount = amount;

    await this.redisCache.invalidate('sales-api-products-list');

    const updatedProduct = await this.productsRepository.update(product);

    return updatedProduct;
  }

  async deleteProductService({ id }: DeleteProductDTO) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found.');
    }

    await this.redisCache.invalidate('sales-api-products-list');

    this.productsRepository.delete(product);
  }
}
