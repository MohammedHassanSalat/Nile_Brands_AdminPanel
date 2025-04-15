import { Component } from '@angular/core';
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

  rating: number = 0;
  stars = Array(5).fill(0);

  setRating(value: number): void {
    this.rating = value;
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

  getUserImageUrl(feedback: any): string {
    if (feedback.user?.userImage && !feedback.user?.userImage.startsWith('http')) {
      return `${this.GlobalService.userimagepreurl}${feedback.user?.userImage}`;
    }
    return feedback.user?.userImage || 'images/noimage.jpg';
  }
}
