import { useEffect, useState } from 'react'
import { itemsInCart } from '@/store/cart.store'
import { useStore } from '@nanostores/react'
import { CartCookiesClient } from '@/utils/cart-cookies-client'

interface Props {
  quantity?: number
}

export const CartCounter = () => {
  const $itemsInCart = useStore(itemsInCart)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cart = CartCookiesClient.getCart();
    itemsInCart.set(cart.length);
    setIsLoading(false)
  }, [])

  //quantity = $itemsInCart

  if (isLoading) return <></>


  return (
    <a href="/store/cart" className="relative inline-block" >
      {
        $itemsInCart>0 &&
        <span className='absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full'>
          {$itemsInCart}
        </span>
      }
      <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24"><path fill="currentColor" d="M0 1h4.764l.545 2h18.078l-3.666 11H7.78l-.5 2H22v2H4.72l1.246-4.989L3.236 3H0zm7.764 11h10.515l2.334-7H5.855zM4 21a2 2 0 1 1 4 0a2 2 0 0 1-4 0m14 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0" /></svg>
    </a>
  )
}
