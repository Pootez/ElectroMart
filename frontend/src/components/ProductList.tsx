import { VStack } from '@chakra-ui/react'
import ProductCard from './ProductCard'
import { SearchContext } from '../contexts/SearchContext'
import { useContext } from 'react'
import { Product } from '../hooks/useProducts'

const ProductList = ({
  actions = [],
}: {
  actions?: { title: string; action: (item: Product) => void }[]
}) => {
  const { products, isLoading, error } = useContext(SearchContext)

  return (
    <VStack padding={3} alignItems="stretch">
      {error
        ? 'Error fetching products'
        : isLoading
        ? 'Fetching products'
        : products.map((product) => (
            <ProductCard key={product.id} actions={actions} product={product} />
          ))}
    </VStack>
  )
}
export default ProductList
