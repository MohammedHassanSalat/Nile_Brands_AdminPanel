import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css',
})
export class ForgetpasswordComponent {
  constructor(private AuthService: AuthService, private Router: Router) {}
  forgetPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  invalidMsg: string = '';

  sendMail(formData: FormGroup) {
    if (formData.valid) {
      this.invalidMsg = '';
      this.AuthService.forgetPassword(formData.value).subscribe({
        next: (res) => {
          localStorage.setItem('resetToken', res.resetToken);
          this.Router.navigate(['/verifyemail']);
        },
        error: (err) => {
          this.invalidMsg =
            err.error?.error?.message || 'something went wrong please try again.';
        },
      });
    }
  }
}
