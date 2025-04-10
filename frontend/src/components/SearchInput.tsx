import { Button, Group, Input } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

export const SearchInput = ({
  onSearch,
}: {
  onSearch: (searchText: string) => void
}) => {
  const ref = useRef<HTMLInputElement>(null)
  const [searchText, setSearchText] = useState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        if (ref.current) onSearch(ref.current.value)
      }}
    >
      <Group attached w="full" maxW="sm" onSubmit={() => onSearch(searchText)}>
        <Input
          ref={ref}
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button variant="surface" type="submit">
          <BsSearch />
        </Button>
      </Group>
    </form>
  )
}
