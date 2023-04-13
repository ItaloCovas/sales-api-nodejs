import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProductsService } from '../../../services/ProductsService';

export class ProductController {
  async index(request: Request, response: Response): Promise<Response> {
    const productsService = container.resolve(ProductsService);

    const products = await productsService.listProductsService();

    return response.status(200).json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const productsService = container.resolve(ProductsService);

    const { id } = request.params;

    const product = await productsService.showProductService({ id });

    return response.status(200).json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const productsService = container.resolve(ProductsService);

    const { name, price, amount } = request.body;

    const product = await productsService.createProductService({
      name,
      price,
      amount,
    });

    return response.status(201).json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const productsService = container.resolve(ProductsService);

    const { name, price, amount } = request.body;
    const { id } = request.params;

    const updatedProduct = await productsService.updateProductService({
      id,
      name,
      price,
      amount,
    });

    return response.status(200).json(updatedProduct);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const productsService = container.resolve(ProductsService);

    const { id } = request.params;

    await productsService.deleteProductService({ id });

    return response.sendStatus(204);
  }
}
