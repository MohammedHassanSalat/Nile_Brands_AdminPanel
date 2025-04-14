import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/users';
import { GlobalService } from '../../../services/global.service';

@Component({
  selector: 'app-viewusers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewusers.component.html',
  styleUrl: './viewusers.component.css',
})
export class ViewusersComponent implements OnInit {
  users: User[] = [];
  pagination: any = {};
  isLoading = true;
  userImage: any;
  fetchDataErrorMsg: string = '';
  deleteUserMsg: string = '';

  constructor(
    private userService: UsersService,
    private GlobalService: GlobalService
  ) {
    this.userImage = this.GlobalService.userimagepreurl;
  }

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers(
    params = { page: 1, limit: 12, sort: 'name', fields: 'name,userImage' }
  ) {
    this.isLoading = true;
    this.userService.getUsers(params).subscribe({
      next: (res) => {
        this.users = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
      },
      error: (err) => {
        this.fetchDataErrorMsg = 'No Data'
        this.isLoading = false;
      },
    });
  }

  getUserImage(imagePath?: string): string {
    return imagePath && !imagePath.startsWith('http') ? `${this.userImage}${imagePath}` : 'images/noimage.jpg';
  }

  deleteUser(userId: string) {
    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.deleteUserMsg = 'user deleted successfully';
        this.fetchUsers();
      },
      error: () => {
        this.deleteUserMsg = 'something went wrong please try again'
      },
    })
  }
}
