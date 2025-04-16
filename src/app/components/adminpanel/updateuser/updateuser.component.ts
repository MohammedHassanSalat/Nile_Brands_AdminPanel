import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { updateUserPassword, updateUserStatus } from '../../../interfaces/users';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateuser',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './updateuser.component.html',
  styleUrl: './updateuser.component.css',
})
export class UpdateuserComponent {
  userId: string | null = null;
  updateStatusForm: FormGroup;
  updatePasswordForm: FormGroup;
  successMsg: string = '';
  failMsg: string = '';

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private UsersService: UsersService,
  ) {
    this.updateStatusForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      active: new FormControl(false),
    });

    // Initialize the password form
    this.updatePasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    // Get user ID from route parameters
    this.userId = this.ActivatedRoute.snapshot.paramMap.get('id');
    if (this.userId) {
      this.fetchUserData(this.userId);
    } else {
      this.failMsg = 'User ID not found';
    }
    this.successMsg = '';
    this.failMsg = '';
  }

  fetchUserData(userId: string) {
    this.UsersService.getUser(userId).subscribe({
      next: (res) => {
        const userData = res.data;
        this.updateStatusForm.patchValue({
          name: userData.name,
          status: userData.active,
        });
      },
      error: (err) => {
        this.failMsg = 'Failed to fetch user data';
      },
    });
  }

  updateUserStatus() {
    if (this.updateStatusForm.valid && this.userId) {
      const formData: updateUserStatus = this.updateStatusForm.value;
      this.UsersService.updateUserStatus(formData, this.userId).subscribe({
        next: (res) => {
          this.successMsg = 'User status updated successfully';
          this.failMsg = '';
        },
        error: (err) => {
          this.failMsg = err.error?.message || 'Failed to update user status';
          this.successMsg = '';
        },
      });
    }
  }

  updateUserPassword() {
    if (this.updatePasswordForm.valid && this.userId) {
      const formData: updateUserPassword = this.updatePasswordForm.value;
      if (formData.password !== formData.confirmPassword) {
        this.failMsg = 'Passwords do not match';
        this.successMsg = '';
        return;
      }
      this.UsersService.updateUserPassword(formData, this.userId).subscribe({
        next: (res) => {
          this.successMsg = 'User password updated successfully';
          this.failMsg = '';
          this.updatePasswordForm.reset();
        },
        error: (err) => {
          this.failMsg = err.error?.message || 'Failed to update user password';
          this.successMsg = '';
        },
      });
    }
  }
}
