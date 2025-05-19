import { Card, VStack } from '@chakra-ui/react'
import { AppGrid } from '../components/AppGrid'
import { CheckoutFieldset } from '../components/CheckoutFieldset'

export const CheckoutPage = () => {
  return (
    <AppGrid>
      <VStack justifyContent="center" alignItems="center" h="100%">
        <Card.Root>
          <Card.Body>
            <CheckoutFieldset />
          </Card.Body>
        </Card.Root>
      </VStack>
    </AppGrid>
  )
}
