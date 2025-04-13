import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  createUser(formData: User): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/users`;
    return this.http.post<any>(url, formData ,{
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }
}
