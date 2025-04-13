import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private AuthService: AuthService, private Router:Router) {}

  ngAfterViewInit() {
    initFlowbite(); // Initializes Flowbite dropdowns after view is ready
  }

  logout() {
    this.AuthService.logout();
    this.Router.navigate(['/signin'])
  }
}
