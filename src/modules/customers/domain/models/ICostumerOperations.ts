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
