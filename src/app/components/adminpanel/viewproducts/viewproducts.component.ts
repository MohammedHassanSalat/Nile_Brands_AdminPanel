import { Component } from '@angular/core';
import { Product } from '../../../interfaces/products';
import { GlobalService } from '../../../services/global.service';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewproducts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './viewproducts.component.html',
  styleUrl: './viewproducts.component.css',
})
export class ViewproductsComponent {
  products: Product[] = [];
  pagination: any = {};
  isLoading = true;
  productImage: any;
  fetchDataErrorMsg: string = '';
  deleteProductMsg: string = '';

  constructor(
    private ProductsService: ProductsService,
    private GlobalService: GlobalService
  ) {
    this.productImage = this.GlobalService.productimagepreurl;
  }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts(
    params = {
      page: 1,
      limit: 15,
      sort: 'name',
      fields: 'name,coverImage,price',
    }
  ) {
    this.isLoading = true;
    this.ProductsService.getAllProducts(params).subscribe({
      next: (res) => {
        this.products = res.data;
        this.pagination = res.pagination;
        this.isLoading = false;
      },
      error: (err) => {
        this.fetchDataErrorMsg = 'No Data';
        this.isLoading = false;
      },
    });
  }

  deleteProduct(brandId: string) {
    this.ProductsService.deleteProduct(brandId).subscribe({
      next: () => {
        this.deleteProductMsg = 'product deleted successfully';
        this.fetchProducts();
      },
      error: () => {
        this.deleteProductMsg = 'something went wrong please try again';
      },
    });
  }

  getProductImageUrl(product: any): string {
    if (product.coverImage && !product.coverImage.startsWith('http')) {
      return `${this.GlobalService.productimagepreurl}${product.coverImage}`;
    }
    return product.coverImage || 'images/noimage.jpg';
  }
}
