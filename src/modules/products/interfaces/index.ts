import { IProduct } from '@modules/orders/interfaces';
import Product from '../typeorm/entities/Product';

export interface CreateProductDTO {
  name: string;
  price: number;
  amount: number;
}

export interface UpdateProductDTO {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface DeleteProductDTO {
  id: string;
}

export interface ShowProductDTO {
  id: string;
}

export interface IProductsRepository {
  create({ name, price, amount }: CreateProductDTO): Promise<Product>;
  findAll(): Promise<Array<Product>>;
  findById(id: string): Promise<Product | null>;
  findByName(name: string): Promise<Product | null>;
  update(product: Product): Promise<Product | null>;
  delete(product: Product): Promise<void>;
  findAllByIds(products: Array<IProduct>): Promise<Array<Product>>;
}
