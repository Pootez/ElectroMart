import { VStack, Text } from '@chakra-ui/react'
import useProducts from '../effects/useProducts'
import ProductCard from './ProductCard'

const ProductList = () => {
  const { products, isLoading, error } = useProducts()

  return (
    <VStack padding={3} alignItems="stretch">
      {error
        ? 'Error fetching products'
        : isLoading
        ? 'Fetching products'
        : products.map((product) => <ProductCard product={product} />)}
    </VStack>
  )
}
export default ProductList
