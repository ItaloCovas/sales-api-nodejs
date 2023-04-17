import 'reflect-metadata';
import { CustomersService } from './CustomersService';
import { MockedCustomersRepository } from '../domain/repositories/mocks/MockedCustomersRepository';
import { ApiError } from '@shared/helpers/ApiError';

let mockedCustomersRepository: MockedCustomersRepository;
let customersService: CustomersService;

describe('CustomersService', () => {
  beforeEach(() => {
    mockedCustomersRepository = new MockedCustomersRepository();
    customersService = new CustomersService(mockedCustomersRepository);
  });
  it('should be able to create a new customer', async () => {
    const customer = await customersService.createCustomerService({
      name: 'Cliente um',
      email: 'teste@teste.com',
    });

    expect(customer).toHaveProperty('id');
  });
  it('should not be able to create two customers with the same email', async () => {
    await customersService.createCustomerService({
      name: 'Cliente um',
      email: 'teste@teste.com',
    });

    expect(
      customersService.createCustomerService({
        name: 'Cliente um',
        email: 'teste@teste.com',
      }),
    ).rejects.toBeInstanceOf(ApiError);
  });
});
