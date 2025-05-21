import { useContext } from 'react'
import { AppGrid } from '../components/AppGrid'
import { UserContext } from '../contexts/UserContext'
import { Box, Card, Heading, Text, VStack } from '@chakra-ui/react'
import { useOrderList } from '../hooks/useOrderList'

export const ProfilePage = () => {
  const { userDetails, token } = useContext(UserContext)
  const orders = userDetails ? useOrderList(token, userDetails?.orders) : []

  return (
    <AppGrid
      aside={
        orders && (
          <Box p={6}>
            <Heading size="4xl">Orders</Heading>
            <VStack justifyContent="strecth">
              {orders.map(
                (order) =>
                  order && (
                    <Card.Root w="100%">
                      <Card.Body>
                        <Card.Title>{`Order #${order.id}`}</Card.Title>
                        <Box>
                          {[
                            new Date(order.orderDate).toLocaleDateString(),
                            order.total + ',-',
                            order.address,
                            order.status,
                          ].map((text) => (
                            <Text>{text}</Text>
                          ))}
                        </Box>
                      </Card.Body>
                    </Card.Root>
                  )
              )}
            </VStack>
          </Box>
        )
      }
    >
      <Box p={10}>
        <Heading size="4xl">Profile</Heading>
        {userDetails && (
          <Box>
            <Text>
              {'Name: ' + `${userDetails.firstname} ${userDetails.lastname}`}
            </Text>
            <Text>{'Email: ' + userDetails.email}</Text>
            <Text>{'Phone: ' + userDetails.phonenumber}</Text>
          </Box>
        )}
      </Box>
    </AppGrid>
  )
}
