import {
  Button,
  CloseButton,
  Drawer,
  IconButton,
  Portal,
  VStack,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { FiShoppingCart } from 'react-icons/fi'
import { CartContext } from '../contexts/CartContext'
import { CartItem } from './CartItem'
import { useNavigate } from 'react-router'
import { useCartProductList } from '../hooks/useCartProductList'

const CartDrawer = () => {
  const [open, setOpen] = useState(false)
  const { cartList, setCartList } = useContext(CartContext)
  const cartProductList = useCartProductList(cartList)
  const navigate = useNavigate()

  return (
    <Drawer.Root size="lg" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Drawer.Trigger asChild>
        <IconButton variant="ghost">
          <FiShoppingCart />
        </IconButton>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>Cart</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
              <VStack>
                {cartProductList.map((item) => (
                  <CartItem
                    key={item.product?.id}
                    product={item.product}
                    count={item.count}
                  />
                ))}
              </VStack>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="outline" onClick={() => setCartList([])}>
                Clear Cart
              </Button>
              <Button onClick={() => navigate('/cart')}>Checkout</Button>
            </Drawer.Footer>
            <Drawer.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Drawer.CloseTrigger>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
export default CartDrawer
