import { Heading, HStack } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'

export const Navbar = () => {
  return (
    <HStack padding="10px">
      <Heading>ElectroMart</Heading>
      <ColorModeButton />
    </HStack>
  )
}
