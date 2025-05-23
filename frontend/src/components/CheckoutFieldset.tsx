import { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { useCartProductList } from '../hooks/useCartProductList'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import { CheckoutData, paymentMethods, useCheckout } from '../hooks/useCheckout'
import { useForm } from 'react-hook-form'
import {
  Box,
  HStack,
  Separator,
  VStack,
  Text,
  Button,
  Fieldset,
  Field,
  Input,
  NativeSelect,
} from '@chakra-ui/react'

export const CheckoutFieldset = () => {
  const { cartList, setCartList } = useContext(CartContext)
  const [checkoutData, setCheckoutData] = useState<CheckoutData | undefined>()
  const cartEmpty = cartList.length == 0

  const cartProductList = useCartProductList(cartList)

  const subTotal = cartProductList.reduce(
    (acc, { product, count }) => (product ? acc + product.price * count : acc),
    0
  )
  const deliveryCost = 30
  const total = subTotal + deliveryCost

  const { userDetails, token } = useContext(UserContext)
  const navigate = useNavigate()

  const { orderId, isLoading, error } = useCheckout(token, checkoutData)

  useEffect(() => {
    if (orderId) {
      setCartList([])
      window.location.href = '/profile'
    }
  }, [orderId])

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutData>()

  useEffect(() => {
    setValue('items', cartList)
  }, [cartList, setValue])

  return (
    <form
      onSubmit={handleSubmit((data) =>
        userDetails ? setCheckoutData(data) : navigate('/signin')
      )}
    >
      <VStack alignItems="stretch">
        <VStack flexShrink={1}>
          {cartProductList.map(
            (item) =>
              !!item.product && (
                <HStack
                  width="100%"
                  justifyContent="space-between"
                  key={item.product.id}
                >
                  <Box>
                    <Text fontWeight="bold" textStyle="lg">
                      {`${item.product?.name} x${item.count}`}
                    </Text>
                  </Box>
                  <Box>
                    <Text textStyle="md">
                      {item.product.price * item.count + ',-'}
                    </Text>
                  </Box>
                </HStack>
              )
          )}
        </VStack>
        <Separator mt={2} />
        {[
          { name: 'Subtotal', amount: subTotal },
          { name: 'Shipping', amount: deliveryCost },
          { name: 'Total', amount: total },
        ].map((fee) => (
          <HStack width="100%" justifyContent="space-between" key={fee.name}>
            <Box>
              <Text fontWeight="bold" textStyle="xl">
                {fee.name}
              </Text>
            </Box>
            <Box>
              <Text textStyle="lg">{fee.amount + ',-'}</Text>
            </Box>
          </HStack>
        ))}
        <Separator my={2} />
        <Fieldset.Root>
          <Fieldset.Content>
            <Field.Root invalid={!!errors.address}>
              <Field.Label>Address</Field.Label>
              <Input
                {...register('address', { required: 'Address is required.' })}
                placeholder="Placeroad 20"
              />
              <Field.ErrorText>{errors.address?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.method}>
              <Field.Label>Payment method</Field.Label>
              <NativeSelect.Root>
                <NativeSelect.Field
                  placeholder="Select payment method"
                  defaultValue={paymentMethods[0]}
                  {...register('method', {
                    required: 'Payment method is required.',
                  })}
                >
                  {paymentMethods.map((method) => (
                    <option value={method}>{method}</option>
                  ))}
                </NativeSelect.Field>
              </NativeSelect.Root>
              <Field.ErrorText>{errors.method?.message}</Field.ErrorText>
            </Field.Root>
          </Fieldset.Content>
          <Button
            size="2xl"
            colorPalette="cyan"
            loading={isLoading}
            disabled={cartEmpty}
            type="submit"
            variant="subtle"
          >
            {cartEmpty
              ? 'Cart is empty'
              : userDetails
              ? 'Simulate payment'
              : 'Sign in to continue'}
          </Button>
        </Fieldset.Root>
      </VStack>
      {error}
    </form>
  )
}
