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
    <Card.Root flexDirection="row" overflow="hidden" variant="elevated">
      <Image width="150px" objectFit="cover" src={imageNotFound} />
      <Box>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Description>
            Lorem ipsum dolor sit amet consectetur adipiscing elit quisque
            faucibus ex sapien vitae pellentesque sem.
          </Card.Description>
          <Text
            textStyle="2xl"
            fontWeight="medium"
            letterSpacing="tight"
            mt="2"
          >
            {`$${product.price}`}
          </Text>
        </Card.Body>
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
