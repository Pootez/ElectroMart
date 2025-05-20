import { Box, Card, Image, Button } from '@chakra-ui/react'
import { Product } from '../hooks/useProducts'
import imageNotFound from '../assets/imageNotFound.png'
import { ProductCardBody } from './ProductCardBody'

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
        <ProductCardBody product={product} />
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
