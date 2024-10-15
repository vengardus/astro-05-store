import type { CartItem } from "./cart-item.interface";

export interface CartItemExtends extends CartItem {
    title: string
    image: string
    price: number
    slug: string
}