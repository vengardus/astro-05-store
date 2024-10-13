import type { ProductWithImages } from '@/interfaces/products/product-with-images.interface'
import { ProductCard } from './ProductCard'


interface Props {
	products: ProductWithImages[]
}

export const ProductList = ({ products }: Props) => {
	return (
		<div className='grid grid-cols-1 gap-x-4 gap-y-7 sm:grid-cols-2 md:grid-cols-3 place-items-center'>
			{
				products.map(product => (
					<ProductCard key={product.id} product={product}  />
				))
			}
		</div>
	)
}
