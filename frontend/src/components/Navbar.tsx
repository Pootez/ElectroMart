import { Button, Heading, HStack } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'
import UserPopover from './UserPopover'
import { useNavigate } from 'react-router'

export const Navbar = () => {
  const navigate = useNavigate()

  return (
    <HStack padding="10px" bg="secondary" justifyContent="space-between">
      <Button onClick={() => navigate('/')} variant="ghost">
        <Heading>ElectroMart</Heading>
      </Button>
      <HStack>
        <UserPopover />
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
