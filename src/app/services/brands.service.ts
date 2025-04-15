import { Injectable } from '@angular/core';
import { BrandsResponse } from '../interfaces/brands';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getAllBrands(params: {
    sort?: string;
    fields?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Observable<BrandsResponse> {
    let url = `${this.globalService.apiUrl}/api/v1/brands`;
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

    return this.http.get<BrandsResponse>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  deleteBrand(brandId: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/brands/${brandId}`;
    return this.http.delete<any>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }
}
