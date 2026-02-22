export interface Product {
  id: number;
  name: string;
  description: string;
  rating: number;
  price: number;

  link: string;
  image: string;
  images: string[];

  likes: number;      
  categoryId: number; 
}

