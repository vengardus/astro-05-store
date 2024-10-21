import type { Product } from "./product.interface";

export interface ProductImage {
    id: string,
    productId: string,
    image: string,
    product?: Product
}