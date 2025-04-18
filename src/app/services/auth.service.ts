import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, resetPassword } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.restoreUser();
  }

  currentUser = new BehaviorSubject<any>(null);
  private isRestored = new BehaviorSubject<boolean>(false); // Tracks restoration

  getLoggedUser(): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/users/me`;
    return this.http.get<any>(url, {
      headers: { authorization: `Bearer ${localStorage.getItem('user')}` },
    });
  }

  restoreUser(): Promise<void> {
    return new Promise((resolve) => {
      const token = localStorage.getItem('user');
      if (token) {
        this.getLoggedUser().subscribe({
          next: (res) => {
            this.currentUser.next(res.data);
            this.isRestored.next(true);
            resolve();
          },
          error: () => {
            localStorage.removeItem('user');
            this.currentUser.next(null);
            this.isRestored.next(true);
            resolve();
          },
        });
      } else {
        this.isRestored.next(true);
        resolve();
      }
    });
  }

  isUserRestored(): Observable<boolean> {
    return this.isRestored.asObservable();
  }

  login(formData: Login): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/auth/login`;
    return this.http.post<any>(url, formData);
  }

  forgetPassword(email: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/auth/forgetPassword`;
    return this.http.post<any>(url, email);
  }

  verifyResetCode(resetCode: string): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/auth/verifyCode`;
    return this.http.post<any>(
      url,
      { resetCode },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem('resetToken')}`,
        },
      }
    );
  }

  resetPassword(formData: resetPassword): Observable<any> {
    const url = `${this.globalService.apiUrl}/api/v1/auth/resetPassword`;
    return this.http.put<any>(url, formData, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('resetToken')}`,
      },
    });
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.next(null);
  }
}
