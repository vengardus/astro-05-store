import type { ProductImage } from "./product-image.interface";

export interface Product {
  id: string;
  description: string;
  images?: ProductImage[];
  stock: number;
  price: number;
  sizes: string;
  slug: string;
  tags: string;
  title: string;
  type: string;
  gender: string;

  user?: string;
}
