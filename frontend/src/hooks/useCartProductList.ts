import { useEffect, useState } from 'react'
import { Product } from './useProducts'
import { getProduct } from './useProduct'

export const useCartProductList = (
  cartList: {
    id: string
    count: number
  }[]
) => {
  const [cartProductList, setCartProductList] = useState<
    { product: Product | undefined; count: number }[]
  >([])

  useEffect(() => {
    const loadProducts = async () => {
      const results = await Promise.all(
        cartList.map(async ({ id, count }) => {
          const product = await getProduct(id)
          return { product, count }
        })
      )
      setCartProductList(results)
    }

    loadProducts()
  }, [cartList])
  return cartProductList
}
