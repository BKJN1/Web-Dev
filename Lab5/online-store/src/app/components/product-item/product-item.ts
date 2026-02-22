import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.html',
  styleUrls: ['./product-item.css'],
})
export class ProductItemComponent {
  product = input.required<Product>();
  delete = output<number>();

  fullStars = computed(() => Array(Math.floor(this.product().rating)).fill(0));
  emptyStars = computed(() => Array(5 - Math.floor(this.product().rating)).fill(0));

  like() {
    this.product().likes++;
  }

  requestDelete() {
    this.delete.emit(this.product().id);
  }

  shareWhatsApp() {
    const link = this.product().link;
    const text = encodeURIComponent(`Check this product: ${link}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareTelegram() {
    const link = this.product().link;
    const text = encodeURIComponent(`Check this product: ${link}`);
    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${text}`, '_blank');
  }
}