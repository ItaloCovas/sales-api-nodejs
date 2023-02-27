import Product from '../typeorm/entities/Product';

export interface CreateProductDTO {
  name: string;
  price: number;
  amount: number;
}

export interface IProductsRepository {
  findByName(name: string): Promise<Product | null>;
}
