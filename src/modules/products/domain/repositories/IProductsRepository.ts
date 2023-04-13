import { CreateProductDTO } from '@modules/products/domain/models/IProductOperations';
import { IProduct } from '../models/IProduct';
import { PaginationParams, PaginationProperties } from '@shared/interfaces';

export interface IProductsRepository {
  create({ name, price, amount }: CreateProductDTO): Promise<IProduct>;
  findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<PaginationProperties>;
  findById(id: string): Promise<IProduct | null>;
  findByName(name: string): Promise<IProduct | null>;
  update(product: IProduct): Promise<IProduct | null>;
  delete(product: IProduct): Promise<void>;
  findAllByIds(products: Array<IProduct>): Promise<Array<IProduct>>;
}
