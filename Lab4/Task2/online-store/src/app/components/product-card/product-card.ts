import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

   get fullStars(): number[] {
    const full = Math.floor(this.product.rating);
    return Array.from({ length: full }, (_, i) => i);
  }
  get emptyStars(): number[] {
    const empty = 5 - Math.floor(this.product.rating);
    return Array.from({ length: empty }, (_, i) => i);
  }

  // Share
  get whatsappShareLink(): string {
    const msg = `Check out this product: ${this.product.link}`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  }

  get telegramShareLink(): string {
    const text = this.product.name;
    const url = this.product.link;
    return `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
  }

  selectedIndex = 0;

  ngOnInit(): void {
    if (this.product?.images?.length) this.selectedIndex = 0;
  }

  get selectedImage(): string {
    return this.product.images?.[this.selectedIndex] ?? this.product.image;
  }

  selectImage(i: number): void {
    this.selectedIndex = i;
  }

  prevImage(): void {
    const n = this.product.images?.length ?? 0;
    if (!n) return;
    this.selectedIndex = (this.selectedIndex - 1 + n) % n;
  }

  nextImage(): void {
    const n = this.product.images?.length ?? 0;
    if (!n) return;
    this.selectedIndex = (this.selectedIndex + 1) % n;
  }



  
}

