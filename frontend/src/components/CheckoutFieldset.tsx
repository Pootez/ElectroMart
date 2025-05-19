import { Button, VStack } from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { CheckoutData, useCheckout } from '../effects/useCheckout'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'

export const CheckoutFieldset = () => {
  const { cartList, setCartList } = useContext(CartContext)
  const [checkoutData, setCheckoutData] = useState<CheckoutData | undefined>()

  const { userDetails, token } = useContext(UserContext)
  const navigate = useNavigate()

  const { orderId, isLoading, error } = useCheckout(token, checkoutData)

  useEffect(() => {
    if (orderId) {
      setCartList([])
      navigate('/order/' + orderId)
    }
  }, [orderId])

  const { handleSubmit } = useForm<CheckoutData>()

  return (
    <form
      onSubmit={handleSubmit(() =>
        userDetails ? setCheckoutData({ items: cartList }) : navigate('/signin')
      )}
    >
      <VStack alignItems="stretch">
        <VStack flexShrink={1}>
          {cartList.map((item) => (
            <CartItem key={item.id} productId={item.id} count={item.count} />
          ))}
        </VStack>
        <Button
          size="2xl"
          colorPalette="cyan"
          loading={isLoading}
          type="submit"
          variant="subtle"
        >
          {userDetails ? 'To payment' : 'Sign in to continue'}
        </Button>
      </VStack>
      {error}
    </form>
  )
}
