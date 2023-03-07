import { container } from 'tsyringe';
import { IProductsRepository } from '@modules/products/interfaces';
import { ProductsRepository } from '@modules/products/repositories/ProductsRepository';
import { ProductController } from '@modules/products/controllers/ProductController';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);

container.registerSingleton('ProductController', ProductController);
