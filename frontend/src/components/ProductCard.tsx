import { Box, Card, Skeleton, Text, Button } from '@chakra-ui/react'
import { Product } from '../effects/useProducts'

const ProductCard = ({ product }: { product?: Product }) => {
  if (!product) return

  return (
    <Card.Root flexDirection="row" overflow="hidden">
      <Skeleton width="150px" objectFit="cover" />
      <Box>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Description>Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem.</Card.Description>
          <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          {`$${product.price}`}
        </Text>
        </Card.Body>
        <Card.Footer gap="2">
          <Button variant="solid">Buy now</Button>
          <Button variant="ghost">Add to cart</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  )
}
export default ProductCard
