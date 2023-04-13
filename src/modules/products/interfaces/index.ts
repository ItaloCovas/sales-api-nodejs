export interface CreateProductDTO {
  name: string;
  price: number;
  amount: number;
}

export interface UpdateProductDTO {
  id: string;
  name: string;
  price: number;
  amount: number;
}

export interface DeleteProductDTO {
  id: string;
}

export interface ShowProductDTO {
  id: string;
}
