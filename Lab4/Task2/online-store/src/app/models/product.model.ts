export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;      // KZT
  rating: number;     // 1..5
  image: string;      // main image
  images: string[];   // min 3
  link: string;       // kaspi.kz link
}
