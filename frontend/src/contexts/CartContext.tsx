import { createContext, useEffect, useState } from 'react'

export type CartContextType = {
  cartList: { id: string; count: number }[]
  setCartList: React.Dispatch<
    React.SetStateAction<{ id: string; count: number }[]>
  >
}

export const CartContext = createContext<CartContextType>({
  cartList: [],
  setCartList: () => {},
})

export const CartContextProvider = ({ children }: { children: any }) => {
  const [cartList, setCartList] = useState<{ id: string; count: number }[]>([])
  const [cartLoaded, setCartLoaded] = useState(false)

  useEffect(() => {
    const json = localStorage.getItem('cartList')
    if (json) setCartList(JSON.parse(json) as { id: string; count: number }[])
    setCartLoaded(true)
  }, [])

  useEffect(() => {
    if (!cartLoaded) return

    localStorage.setItem('cartList', JSON.stringify(cartList))
  }, [cartList])

  return (
    <CartContext.Provider value={{ cartList, setCartList }}>
      {children}
    </CartContext.Provider>
  )
}
