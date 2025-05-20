import { Button, Heading, HStack } from '@chakra-ui/react'
import { ColorModeButton } from './ui/color-mode'
import UserPopover from './UserPopover'
import { useLoaderData, useNavigate } from 'react-router'
import { SearchInput } from './SearchInput'
import CartDrawer from './CartDrawer'
import { useContext, useEffect } from 'react'
import { SearchContext } from '../contexts/SearchContext'

export const Navbar = () => {
  const { searchParams, setSearchParams } = useContext(SearchContext)
  const data = useLoaderData()
  const navigate = useNavigate()
  
    useEffect(() => {
      if (!data) return
      setSearchParams({ ...searchParams, text: data?.searchText || '' })
    }, [data?.searchText])

  return (
    <HStack padding="10px" bg="secondary" justifyContent="space-between">
      <a href="/">
        <Button variant="ghost">
          <Heading>ElectroMart</Heading>
        </Button>
      </a>
      <SearchInput
        onSearch={(searchText) => {
          searchText ? navigate('/search/' + searchText) : navigate('/')
        }}
      />
      <HStack>
        <CartDrawer />
        <UserPopover />
        <ColorModeButton />
      </HStack>
    </HStack>
  )
}
