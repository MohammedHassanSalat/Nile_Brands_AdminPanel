import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient, HttpParamsOptions } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateUser, UsersResponse } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  createUser(formData: CreateUser): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/users`;
    return this.http.post<any>(url, formData, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  getUsers(params: {
    sort?: string;
    fields?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Observable<UsersResponse> {
    let url = `${this.globalService.apiUrl}/api/v1/users`;
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

    return this.http.get<UsersResponse>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  deleteUser(userId: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/users/${userId}`;
    return this.http.delete<any>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }
}
