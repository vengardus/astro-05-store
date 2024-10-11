import React from 'react'
import type { ProductWithImages } from '@/interfaces/products/product-with-images.interface'


interface Props {   
    products: ProductWithImages[]
}

export const ProductList = ({ products }: Props) => {
  return (
    <div>
        {
            products.map( product => (
                <div key={product.id}>
                    <p>{product.title}</p>
                </div>
            ) )
        }
    </div>
  )
}
