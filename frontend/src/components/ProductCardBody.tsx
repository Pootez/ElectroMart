import { Badge, Card, HStack, Text } from '@chakra-ui/react'
import { Product } from '../effects/useProducts'

export const ProductCardBody = ({ product }: { product: Product }) => {
    const {name, price, description, stockquantity: stock, brand, category } = product
  return (
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <HStack>
        <Badge>{stock > 20 ? 'In stock' : stock > 0 ? 'Low stock' : 'Out of stock'}</Badge>
        <Badge>{category.name}</Badge>
        <Badge>{brand.name}</Badge>
      </HStack>
      <Card.Description>{description}</Card.Description>
      <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
        {`${Number(price)},-`}
      </Text>
    </Card.Body>
  )
}
