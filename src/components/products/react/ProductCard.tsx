import { useState } from 'react'
import type { ProductWithImages } from '@/interfaces/products/product-with-images.interface'

interface Props {
  product: ProductWithImages
}

export const ProductCard = ({ product }: Props) => {
  const images = product.images.split(',').map(image => {
    return image.startsWith('http') ? image : `${import.meta.env.PUBLIC_URL}/images/products/${image}`
  })
  const [currentImage, setCurrentImage] = useState<string>(images[0])

  return (
    <a
      href={`/store/products/${product.slug}`}
      className="flex flex-col items-center justify-between h-full"
      
    >
      <img
        src={currentImage}
        alt={product.title}
        className="w-full h-64 object-contain cursor-pointer"
        onMouseEnter={() => setCurrentImage(images[1] ?? images[0])}
        onMouseLeave={() => setCurrentImage(images[0])}
      />
      <h4 className="mt-2 text-center ">{product.title}</h4>
      <p className="mt-1 ">$ {product.price.toFixed(2)}</p>
    </a>

  )
}
