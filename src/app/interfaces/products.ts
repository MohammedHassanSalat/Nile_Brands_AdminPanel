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



export interface ProductReview {
  _id: string;
  rating: number;
  comment: string;
  user?: {
    "userImage": string;
  };
}

export interface ProductReviewsResponse {
  length: number;
  pagination: Pagination;
  data: ProductReview[];
}
