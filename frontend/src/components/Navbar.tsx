import { Heading, HStack } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'

export const Navbar = () => {
  return (
    <HStack padding="10px" bg="gray.700" justifyContent="space-between">
      <Heading>ElectroMart</Heading>
      <HStack>
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
