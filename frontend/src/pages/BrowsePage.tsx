import { useContext } from 'react'
import { AppGrid } from '../components/AppGrid'
import ProductList from '../components/ProductList'
import { CartContext } from '../contexts/CartContext'

export const BrowsePage = () => {
  const { cartList, setCartList } = useContext(CartContext)

  return (
    <AppGrid>
      <ProductList
        actions={[
          {
            title: 'Add to Cart',
            action: (item) => {
              const cartInstance = cartList.find(
                (cartItem) => cartItem.id == item.id
              )
              cartInstance
                ? setCartList(
                    cartList.map((cartItem) => {
                      return {
                        ...cartItem,
                        count:
                          cartItem.id == cartInstance.id
                            ? cartItem.count + 1
                            : cartItem.count,
                      }
                    })
                  )
                : setCartList([...cartList, { id: item.id, count: 1 }])
            },
          },
        ]}
      />
    </AppGrid>
  )
}
