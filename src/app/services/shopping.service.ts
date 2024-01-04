import { Injectable } from '@angular/core';

// Imports of RXJS
import { Observable, of } from 'rxjs';
import { Product } from '../types/product.type';
import { PRODUCT_LIST } from '../mocks/products.mock';

@Injectable({
  providedIn: 'root',
})
export class ShoppingService {
  constructor() {}

  getUserData(): Observable<string | number> {
    return of('Hello', 'Erika', 22);
  }

  getAllProducts(): Observable<Product[]> {
    return of(PRODUCT_LIST);
  }
}
