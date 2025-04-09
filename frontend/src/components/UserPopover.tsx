import { Button, IconButton, Popover, VStack } from '@chakra-ui/react'
import { useContext } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { useNavigate } from 'react-router'

const UserPopover = () => {
  const { userDetails, setToken } = useContext(UserContext) as UserContextType
  const navigate = useNavigate()

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <IconButton variant="ghost">
          <FaRegUserCircle />
        </IconButton>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Body>
            <Popover.Arrow />
            <VStack>
              <Popover.Title textStyle="xl" fontWeight="bold" paddingBottom={3}>
                {userDetails ? userDetails.username : 'Not signed in'}
              </Popover.Title>
              {userDetails ? (
                <Button
                  onClick={() => {
                    localStorage.setItem('token', '')
                    setToken('')
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button onClick={() => navigate('/signin')}>Sign in</Button>
                  <Button onClick={() => navigate('/register')}>
                    Register
                  </Button>
                </>
              )}
            </VStack>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  )
}
export default UserPopover
