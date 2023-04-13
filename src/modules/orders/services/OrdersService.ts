import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { inject, injectable } from 'tsyringe';
import { CreateOrderDTO, IOrdersRepository } from '../interfaces';
import Order from '../infra/typeorm/entities/Order';
import { ICustomersRepository } from '@modules/customers/interfaces';
import { IProductsRepository } from '@modules/products/interfaces';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Product from '@modules/products/infra/typeorm/entities/Product';

@injectable()
export class OrdersService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  async createOrderService({
    customer_id,
    products,
  }: Partial<CreateOrderDTO>): Promise<Order> {
    const customerExists = await this.customersRepository.findById(
      customer_id as string,
    );

    if (customerExists) {
      throw new NotFoundError('Customer not found.');
    }

    const productsExists = await this.productsRepository.findAllByIds(products);

    if (!productsExists.length) {
      throw new NotFoundError('These products were not found.');
    }

    const productsIdsExists = productsExists.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !productsIdsExists.includes(product.product_id),
    );

    if (checkInexistentProducts.length) {
      throw new NotFoundError(
        `Product ${checkInexistentProducts[0].product_id} was not found.`,
      );
    }

    const availableAmount = products.filter(
      product =>
        productsExists.filter(p => p.id === product.product_id)[0].amount <
        product.amount,
    );

    if (availableAmount.length) {
      throw new BadRequestError(
        `The amount ${availableAmount[0].amount}
         is not available for ${availableAmount[0].product_id}.`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.product_id,
      amount: product.amount,
      price: productsExists.filter(p => p.id === product.product_id)[0].price,
    }));

    const order = await this.ordersRepository.create({
      customer: customerExists as unknown as Customer,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductAmount = order_products.map(product => ({
      id: product.product_id,
      amount:
        productsExists.filter(p => p.id === product.product_id)[0].amount -
        product.amount,
    }));

    await this.productsRepository.update(
      updatedProductAmount as unknown as Product,
    );

    return order;
  }

  async showOrderService(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new NotFoundError('Order not found.');
    }

    return order;
  }

  // async listProductsService(): Promise<Array<Product>> {
  //   const products = await this.productsRepository.findAll();

  //   return products;
  // }

  // async deleteProductService({ id }: DeleteProductDTO) {
  //   const product = await this.productsRepository.findById(id);

  //   if (!product) {
  //     throw new NotFoundError('Product not found.');
  //   }

  //   this.productsRepository.delete(product);
  // }
}
