import { Button, Heading, HStack } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'
import UserPopover from './UserPopover'
import { useNavigate } from 'react-router'
import { SearchInput } from './SearchInput'
import { SearchContext } from '../contexts/SearchContext'
import { useContext } from 'react'

export const Navbar = () => {
  const navigate = useNavigate()
  const { searchParams, setSearchParams } = useContext(SearchContext)

  return (
    <HStack padding="10px" bg="secondary" justifyContent="space-between">
      <Button onClick={() => navigate('/')} variant="ghost">
        <Heading>ElectroMart</Heading>
      </Button>
      <SearchInput
        onSearch={(searchText) => {
          setSearchParams({ ...searchParams, text: searchText })
        }}
      />
      <HStack>
        <UserPopover />
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
