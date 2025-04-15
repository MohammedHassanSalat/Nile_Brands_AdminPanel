import { Pagination } from "./users";

export interface Brand {
  _id: string;
  name: string;
  logo: string;
}

export interface BrandsResponse {
  length: number;
  pagination: Pagination;
  data: Brand[];
}
