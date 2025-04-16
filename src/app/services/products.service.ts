import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductReviewsResponse, ProductsResponse } from '../interfaces/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getAllProducts(params: {
    sort?: string;
    fields?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Observable<ProductsResponse> {
    let url = `${this.globalService.apiUrl}/api/v1/products`;
    const queryParams = [];
    if (params.sort)
      queryParams.push(`sort=${encodeURIComponent(params.sort)}`);
    if (params.fields)
      queryParams.push(`fields=${encodeURIComponent(params.fields)}`);
    if (params.page) queryParams.push(`page=${params.page}`);
    if (params.limit) queryParams.push(`limit=${params.limit}`);
    if (params.search)
      queryParams.push(`search=${encodeURIComponent(params.search)}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    return this.http.get<ProductsResponse>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  deleteProduct(productId: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/products/${productId}`;
    return this.http.delete<any>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  getAllProductReviews(
    params: {
      sort?: string;
      fields?: string;
      page?: number;
      limit?: number;
      search?: string;
    },
    productId: string
  ): Observable<ProductReviewsResponse> {
    let url = `${this.globalService.apiUrl}/api/v1/products/${productId}/reviews`;
    const queryParams = [];
    if (params.sort)
      queryParams.push(`sort=${encodeURIComponent(params.sort)}`);
    if (params.fields)
      queryParams.push(`fields=${encodeURIComponent(params.fields)}`);
    if (params.page) queryParams.push(`page=${params.page}`);
    if (params.limit) queryParams.push(`limit=${params.limit}`);
    if (params.search)
      queryParams.push(`search=${encodeURIComponent(params.search)}`);

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    return this.http.get<ProductReviewsResponse>(url);
  }

  deleteProductReview(productId: string, reviewId: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/products/${productId}/reviews/${reviewId}`;
    return this.http.delete<any>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }
}
