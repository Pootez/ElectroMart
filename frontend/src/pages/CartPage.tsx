import { Card, VStack } from '@chakra-ui/react'
import { AppGrid } from '../components/AppGrid'
import { CartFieldset } from '../components/CartFieldset'

export const CartPage = () => {
  return (
    <AppGrid>
      <VStack justifyContent="center" alignItems="center" h="100%">
        <Card.Root>
          <Card.Body>
            <CartFieldset />
          </Card.Body>
        </Card.Root>
      </VStack>
    </AppGrid>
  )
}
