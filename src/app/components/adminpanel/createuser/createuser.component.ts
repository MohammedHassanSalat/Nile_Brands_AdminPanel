import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createuser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './createuser.component.html',
  styleUrl: './createuser.component.css',
})
export class CreateuserComponent implements OnInit {
  constructor(private UsersService: UsersService) {}
  createUserForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    role: new FormControl('user', [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
    this.successMsg = '';
    this.failMsg = '';
  }

  successMsg: string = '';
  failMsg: string = '';

  createUser(formData: FormGroup) {
    if (formData.valid) {
      this.successMsg = '';
      this.failMsg = '';
      this.UsersService.createUser(formData.value).subscribe({
        next: (res) => {
          this.successMsg = 'user created successfully';
        },
        error: (err) => {
          this.failMsg =
            err.error?.errors[0]?.msg || 'invalid data try again please';
        },
      });
    }
  }
}
