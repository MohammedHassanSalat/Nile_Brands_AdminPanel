import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { GlobalService } from '../../../services/global.service';
import { ProductReview } from '../../../interfaces/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productreviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productreviews.component.html',
  styleUrl: './productreviews.component.css',
})
export class ProductreviewsComponent {
  productId: string | null = '';
  productReviews: ProductReview[] = [];
  pagination: any = {};
  isLoading = true;
  userImage: any;
  fetchDataErrorMsg: string = '';
  deleteReviewMsg: string = '';

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ProductsService: ProductsService,
    private GlobalService: GlobalService
  ) {}

  rating: number = 0;
  stars = Array(5).fill(0);

  setRating(value: number): void {
    this.rating = value;
  }

  ngOnInit() {
    this.userImage = this.GlobalService.userimagepreurl;
    // Get user ID from route parameters
    this.productId = this.ActivatedRoute.snapshot.paramMap.get('id');
    if (this.productId) {
      this.fetchProductReviews(
        {
          page: 1,
          limit: 12,
          sort: 'rating',
          fields: 'userImage,rating,comment',
        },
        this.productId
      );
    } else {
      this.fetchDataErrorMsg = 'Products ID not found';
    }
    this.fetchDataErrorMsg = '';
  }

  fetchProductReviews(
    params = {
      page: 1,
      limit: 12,
      sort: 'rating',
      fields: 'userImage,rating,comment',
    },
    productId: string
  ) {
    this.isLoading = true;
    this.ProductsService.getAllProductReviews(params, productId).subscribe({
      next: (res) => {
        this.productReviews = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
      },
      error: (err) => {
        this.fetchDataErrorMsg = 'No Data';
        this.isLoading = false;
      },
    });
  }

  deleteProductReview(productId: string, productReviewId: string) {
    this.ProductsService.deleteProductReview(
      productId,
      productReviewId
    ).subscribe({
      next: () => {
        this.deleteReviewMsg = 'review deleted successfully';
        this.fetchProductReviews(
          {
            page: 1,
            limit: 12,
            sort: 'rating',
            fields: 'userImage,rating,comment',
          },
          productId
        );
      },
      error: () => {
        this.deleteReviewMsg = 'something went wrong please try again';
      },
    });
  }

  getUserImageUrl(review: any): string {
    if (review.user?.userImage && !review.user?.userImage.startsWith('http')) {
      return `${this.GlobalService.userimagepreurl}${review.user?.userImage}`;
    }
    return review.user?.userImage || 'images/noimage.jpg';
  }
}
