import { BadRequestError } from '@shared/helpers/ApiError';
import { CreateProductDTO } from '../interfaces';
import ProductsRepository from '../repositories/ProductsRepository';

class ProductsService {
  public async createProduct({ name, price, amount }: CreateProductDTO) {
    const productsRepository = ProductsRepository;
    const productExists = await productsRepository.findByName(name);

    if (!productExists) {
      throw new BadRequestError('This product already exists.');
    }

    return productsRepository.create({
      name,
      price,
      amount,
    });
  }
}

export default new ProductsService();
