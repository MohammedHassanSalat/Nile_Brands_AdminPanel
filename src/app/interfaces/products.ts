import { Pagination } from "./users";

export interface Product {
  _id: string;
  name: string;
  coverImage: string;
  price: number;
}

export interface ProductsResponse {
  length: number;
  pagination: Pagination;
  data: Product[];
}
