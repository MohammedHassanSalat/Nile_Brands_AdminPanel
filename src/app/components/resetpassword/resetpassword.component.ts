import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css',
})
export class ResetpasswordComponent {
  constructor(private AuthService: AuthService, private Router: Router) {}
  resetPasswordForm = new FormGroup({
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  errorMessage: string = '';

  resetPassword(formData: FormGroup) {
    if (formData.valid) {
      this.errorMessage = '';
      this.AuthService.resetPassword(formData.value).subscribe({
        next: () => {
          this.Router.navigate(['/login']);
          localStorage.removeItem('resetToken');
        },
        error: (err) => {
          this.errorMessage = err.error.errors[0].msg || 'something went wrong please try again.';
        },
      });
    }
  }
}
