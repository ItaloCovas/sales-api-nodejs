import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { injectable, inject } from 'tsyringe';
import {
  CreateProductDTO,
  DeleteProductDTO,
  IProductsRepository,
  ShowProductDTO,
  UpdateProductDTO,
} from '../interfaces';
import Product from '../typeorm/entities/Product';
@injectable()
export class ProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async createProductService({ name, price, amount }: CreateProductDTO) {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new BadRequestError('This product already exists.');
    }

    return this.productsRepository.create({
      name,
      price,
      amount,
    });
  }

  async listProductsService(): Promise<Array<Product>> {
    const products = await this.productsRepository.findAll();

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

    const updatedProduct = await this.productsRepository.update(product);

    return updatedProduct;
  }

  async deleteProductService({ id }: DeleteProductDTO) {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new NotFoundError('Product not found.');
    }

    this.productsRepository.delete(product);
  }
}
