import { Component } from '@angular/core';
import { GlobalService } from '../../../services/global.service';
import { BrandsService } from '../../../services/brands.service';
import { Brand } from '../../../interfaces/brands';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewbrands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewbrands.component.html',
  styleUrl: './viewbrands.component.css',
})
export class ViewbrandsComponent {
  brands: Brand[] = [];
  pagination: any = {};
  isLoading = true;
  brandImage: any;
  fetchDataErrorMsg: string = '';
  deleteBrandMsg: string = '';

  constructor(
    private BrandsService: BrandsService,
    private GlobalService: GlobalService,
  ) {
    this.brandImage = this.GlobalService.brandimagepreurl;
  }

  ngOnInit() {
    this.fetchBrands();
  }

  fetchBrands(
    params = { page: 1, limit: 12, sort: 'name', fields: 'name,logo' }
  ) {
    this.isLoading = true;
    this.BrandsService.getAllBrands(params).subscribe({
      next: (res) => {
        this.brands = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
      },
      error: (err) => {
        this.fetchDataErrorMsg = 'No Data';
        this.isLoading = false;
      },
    });
  }

  getBrandImage(imagePath?: string): string {
    return imagePath && !imagePath.startsWith('http')
      ? `${this.brandImage}${imagePath}`
      : 'images/noimage.jpg';
  }

  deleteBrand(brandId: string) {
    this.BrandsService.deleteBrand(brandId).subscribe({
      next: () => {
        this.deleteBrandMsg = 'brand deleted successfully';
        this.fetchBrands();
      },
      error: () => {
        this.deleteBrandMsg = 'something went wrong please try again';
      },
    });
  }
}
