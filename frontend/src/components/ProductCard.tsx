import { Box, Card, Image, Text, Button } from '@chakra-ui/react'
import { Product } from '../effects/useProducts'
import imageNotFound from '../assets/imageNotFound.png'

const ProductCard = ({
  product,
  actions = [],
}: {
  product?: Product
  actions?: { title: string; action: (item: Product) => void }[]
}) => {
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
          {actions.map((action, idx) => (
            <Button
              key={idx}
              variant="solid"
              onClick={() => action.action(product)}
            >
              {action.title}
            </Button>
          ))}
        </Card.Footer>
      </Box>
    </Card.Root>
  )
}
export default ProductCard
