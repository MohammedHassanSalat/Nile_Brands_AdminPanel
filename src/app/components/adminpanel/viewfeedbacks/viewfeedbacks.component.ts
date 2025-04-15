import { Component } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { GlobalService } from '../../../services/global.service';
import { Feedback } from '../../../interfaces/feedbacks';
import { FeedbacksService } from '../../../services/feedbacks.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewfeedbacks',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewfeedbacks.component.html',
  styleUrl: './viewfeedbacks.component.css',
})
export class ViewfeedbacksComponent {
  feedbacks: Feedback[] = [];
  pagination: any = {};
  isLoading = true;
  userImage: any;
  fetchDataErrorMsg: string = '';

  rating: number = 0; // Stores selected rating
  hoveredRating: number = 0; // Stores temporary hover rating
  stars = Array(5).fill(0); // Creates an array of 5 elements for stars

  setRating(value: number): void {
    this.rating = value; // Set the clicked rating
  }

  constructor(
    private GlobalService: GlobalService,
    private FeedbacksService: FeedbacksService
  ) {
    this.userImage = this.GlobalService.userimagepreurl;
  }

  ngOnInit() {
    this.fetchFeedbacks();
  }

  fetchFeedbacks(
    params = {
      page: 1,
      limit: 12,
      sort: 'rating',
      fields: 'comment,userImage,rating',
    }
  ) {
    this.isLoading = true;
    this.FeedbacksService.getUFeedbacks(params).subscribe({
      next: (res) => {
        this.feedbacks = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
      },
      error: (err) => {
        this.fetchDataErrorMsg = 'No Data';
        this.isLoading = false;
      },
    });
  }

  getUserImage(imagePath?: string): string {
    return imagePath && !imagePath.startsWith('http')
      ? `${this.userImage}${imagePath}`
      : 'images/noimage.jpg';
  }
}
