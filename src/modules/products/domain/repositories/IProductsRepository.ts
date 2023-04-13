import { CreateProductDTO } from '@modules/products/interfaces';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
  create({ name, price, amount }: CreateProductDTO): Promise<IProduct>;
  findAll(): Promise<Array<IProduct>>;
  findById(id: string): Promise<IProduct | null>;
  findByName(name: string): Promise<IProduct | null>;
  update(product: IProduct): Promise<IProduct | null>;
  delete(product: IProduct): Promise<void>;
  findAllByIds(products: Array<IProduct>): Promise<Array<IProduct>>;
}
