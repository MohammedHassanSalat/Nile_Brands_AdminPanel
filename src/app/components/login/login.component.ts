import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private AuthService: AuthService, private Router: Router) {}
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  invalidLoginMsg: string = '';

  login(formData: FormGroup) {
    if (formData.valid) {
      this.invalidLoginMsg = '';
      this.AuthService.login(formData.value).subscribe({
        next: (res) => {
          if (res.token) {
            localStorage.setItem('user', res.token);
            this.AuthService.getLoggedUser().subscribe({
              next: (userRes) => {
                const role = userRes.data?.role;
                if (role === 'admin') {
                  this.AuthService.currentUser.next(userRes.data);
                  this.Router.navigate(['/dashboard/viewbrands']);
                } else {
                  localStorage.removeItem('user')
                  this.invalidLoginMsg = 'invalid role credentials';
                }
              },
              error: (err) => {
                this.invalidLoginMsg = 'something went wrong please try again.';
              },
            });
          }
        },
        error: (err) => {
          this.invalidLoginMsg = err.error?.error?.message || 'invalid credentials';
        },
      });
    }
  }
}
