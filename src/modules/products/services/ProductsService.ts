import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { injectable, inject } from 'tsyringe';
import {
  CreateProductDTO,
  DeleteProductDTO,
  ShowProductDTO,
  UpdateProductDTO,
} from '@modules/products/domain/models/IProductOperations';
import { IRedisCache } from '@shared/cache/RedisCache';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import { PaginationProperties, PaginationServices } from '@shared/interfaces';
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

  async listProductsService({
    page,
    limit,
  }: PaginationServices): Promise<PaginationProperties> {
    const take = limit;
    const skip = Number((page - 1) * take);
    let products = await this.redisCache.recover<PaginationProperties>(
      'sales-api-products-list',
    );

    console.log(products);

    if (!products || products.data.length === 0) {
      products = await this.productsRepository.findAll({ page, skip, take });

      await this.redisCache.save('sales-api-products-list', products);
    }

    return products as PaginationProperties;
  }

  async showProductService({ id }: ShowProductDTO): Promise<IProduct | null> {
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
  }: UpdateProductDTO): Promise<IProduct | null> {
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
