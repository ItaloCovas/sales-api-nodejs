import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { OrdersService } from '../services/OrdersService';

export class OrderController {
  async show(request: Request, response: Response): Promise<Response> {
    const ordersService = container.resolve(OrdersService);

    const { id } = request.params;

    const order = await ordersService.showOrderService(id);

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const ordersService = container.resolve(OrdersService);

    const { customer_id, products } = request.body;

    const order = await ordersService.createOrderService({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
