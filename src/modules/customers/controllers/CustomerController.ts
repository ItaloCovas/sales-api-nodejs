import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CustomersService } from '../services/CustomersService';

export class CustomerController {
  async index(request: Request, response: Response): Promise<Response> {
    const customersService = container.resolve(CustomersService);

    const customers = await customersService.listCustomersService();

    return response.status(200).json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const customersService = container.resolve(CustomersService);

    const { id } = request.params;

    const customer = await customersService.showCustomerService({
      customerId: id,
    });

    return response.status(200).json(customer);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const customersService = container.resolve(CustomersService);

    const { name, email } = request.body;

    const customer = await customersService.createCustomerService({
      name,
      email,
    });

    return response.status(201).json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const customersService = container.resolve(CustomersService);

    const { name, email } = request.body;
    const { id } = request.params;

    const updatedCustomer = await customersService.updateCustomerService({
      customerId: id,
      email,
      name,
    });

    return response.status(200).json(updatedCustomer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const customersService = container.resolve(CustomersService);

    const { id } = request.params;

    await customersService.deleteCustomerService({ customerId: id });

    return response.sendStatus(204);
  }
}
