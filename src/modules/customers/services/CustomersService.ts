import { BadRequestError, NotFoundError } from '@shared/helpers/ApiError';
import { injectable, inject } from 'tsyringe';
import {
  CreateCustomerDTO,
  DeleteCustomerDTO,
  ICustomersRepository,
  ShowCustomerDTO,
  UpdateCustomerDTO,
} from '../interfaces';
import Customer from '../typeorm/entities/Customer';

@injectable()
export class CustomersService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  async listCustomers(): Promise<Array<Customer>> {
    const customers = await this.customersRepository.findAll();

    return customers;
  }

  async createCustomer({ name, email }: CreateCustomerDTO): Promise<Customer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new BadRequestError('Email address already in use.');
    }

    const customer = this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }

  async showCustomer({ customerId }: ShowCustomerDTO): Promise<Customer> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new NotFoundError('Customer not found.');
    }

    return customer;
  }

  async updateCustomer({
    customerId,
    name,
    email,
  }: UpdateCustomerDTO): Promise<Customer> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new NotFoundError('Customer not found.');
    }

    const customerUpdateEmail = await this.customersRepository.findByEmail(
      email,
    );

    if (customerUpdateEmail && email !== customer.email) {
      throw new BadRequestError(
        'There is already one customer with this email.',
      );
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.update(customer);

    return customer;
  }

  async deleteCustomer({ customerId }: DeleteCustomerDTO) {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new NotFoundError('Customer not found.');
    }

    this.customersRepository.delete(customer);
  }
}
