import {
  Box,
  Card,
  HStack,
  IconButton,
  NumberInput,
  Image,
  Text,
} from '@chakra-ui/react'
import useProduct from '../effects/useProduct'
import { LuMinus, LuPlus } from 'react-icons/lu'
import { useContext } from 'react'
import { CartContext } from '../contexts/CartContext'
import imageNotFound from '../assets/imageNotFound.png'
import { ProductCardBody } from './ProductCardBody'

export const CartItem = ({
  productId,
  count,
}: {
  productId: string
  count: number
}) => {
  const { product } = useProduct(productId)
  const { cartList, setCartList } = useContext(CartContext)
  if (!product) return

  return (
    <Card.Root w='100%' flexDirection="row" overflow="hidden" variant="elevated">
      <Image width="150px" objectFit="cover" src={imageNotFound} />
      <Box>
        <ProductCardBody product={product} />
        <Card.Footer gap="2">
          <NumberInput.Root value={'' + count} unstyled spinOnPress={false}>
            <HStack gap="2">
              <IconButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setCartList(
                    cartList
                      .map((item) =>
                        item.id == product.id
                          ? { ...item, count: item.count - 1 }
                          : item
                      )
                      .filter((item) => item.count > 0)
                  )
                }}
              >
                <LuMinus />
              </IconButton>
              <NumberInput.ValueText
                textAlign="center"
                fontSize="lg"
                minW="3ch"
              />
              <IconButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setCartList(
                    cartList.map((item) =>
                      item.id == product.id
                        ? { ...item, count: item.count + 1 }
                        : item
                    )
                  )
                }}
              >
                <LuPlus />
              </IconButton>
            </HStack>
          </NumberInput.Root>
        </Card.Footer>
      </Box>
    </Card.Root>
  )
}
