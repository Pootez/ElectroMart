import { VStack } from '@chakra-ui/react'
import ProductCard from './ProductCard'
import { SearchContext } from '../contexts/SearchContext'
import { useContext } from 'react'

const ProductList = () => {
  const { products, isLoading, error } = useContext(SearchContext)

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
