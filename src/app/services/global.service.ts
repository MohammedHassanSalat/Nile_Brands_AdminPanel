import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor() {}
  apiUrl = 'https://nile-brands.up.railway.app';
  userimagepreurl: any = `${this.apiUrl}/users/`;
  brandimagepreurl: any = `${this.apiUrl}/brands/`;
  productimagepreurl: any = `${this.apiUrl}/products/`;
}
