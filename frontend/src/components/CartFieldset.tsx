import { Button, VStack, Text, Separator, HStack, Box } from '@chakra-ui/react'
import { CartItem } from './CartItem'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import { CheckoutData } from '../hooks/useCheckout'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useCartProductList } from '../hooks/useCartProductList'

export const CartFieldset = () => {
  const { cartList } = useContext(CartContext)
  const cartEmpty = cartList.length == 0

  const cartProductList = useCartProductList(cartList)

  const subTotal = cartProductList.reduce(
    (acc, { product, count }) => (product ? acc + product.price * count : acc),
    0
  )

  const { userDetails } = useContext(UserContext)
  const navigate = useNavigate()

  const { handleSubmit } = useForm<CheckoutData>()

  return (
    <form
      onSubmit={handleSubmit(() =>
        userDetails ? navigate('/checkout') : navigate('/signin')
      )}
    >
      <VStack alignItems="stretch">
        <VStack flexShrink={1}>
          {cartProductList
            .filter((item) => !!item.product)
            .map((item) => (
              <CartItem
                key={item.product?.id}
                product={item.product}
                count={item.count}
              />
            ))}
        </VStack>
        <Separator mt={2} />
        <HStack justifyContent="space-around">
          <Box>
            <Text fontWeight="bold" textStyle="xl">
              Subtotal
            </Text>
          </Box>
          <Box>
            <Text textStyle="xl">{subTotal + ',-'}</Text>
          </Box>
        </HStack>
        <Separator mb={2} />
        <Button
          size="2xl"
          colorPalette="cyan"
          disabled={cartEmpty}
          type="submit"
          variant="subtle"
        >
          {cartEmpty
            ? 'Cart is empty'
            : userDetails
            ? 'To payment'
            : 'Sign in to continue'}
        </Button>
      </VStack>
    </form>
  )
}
