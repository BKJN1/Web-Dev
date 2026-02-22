import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { ProductItemComponent } from '../product-item/product-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductItemComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductListComponent {
  products = input.required<Product[]>();

  removeById(id: number) {
    const arr = this.products();
    const idx = arr.findIndex(p => p.id === id);
    if (idx >= 0) arr.splice(idx, 1);
  }
}