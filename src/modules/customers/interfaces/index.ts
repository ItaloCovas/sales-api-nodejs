import Customer from '../typeorm/entities/Customer';

export interface CreateCustomerDTO {
  name: string;
  email: string;
}

export interface ShowCustomerDTO {
  customerId: string;
}

export interface UpdateCustomerDTO {
  customerId: string;
  name: string;
  email: string;
}

export interface DeleteCustomerDTO {
  customerId: string;
}

export interface CostumersPaginationParams {
  page: number;
  limit: number;
}

export interface PaginationParams {
  page: number;
  skip: number;
  take: number;
}

export interface CostumersPaginationProperties {
  perPage: number;
  total: number;
  currentPage: number;
  data: Array<Customer>;
}

export interface ICustomersRepository {
  create({ name, email }: CreateCustomerDTO): Promise<Customer>;
  findAll({
    page,
    skip,
    take,
  }: PaginationParams): Promise<CostumersPaginationProperties>;
  findByName(name: string): Promise<Customer | null>;
  findByEmail(email: string): Promise<Customer | null>;
  findById(id: string): Promise<Customer | null>;
  update(customer: Customer): Promise<Customer | null>;
  delete(customer: Customer): Promise<void>;
}
