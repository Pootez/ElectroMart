import {
  Button,
  HStack,
  IconButton,
  Popover,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react'
import { useContext } from 'react'
import { FaExternalLinkAlt, FaRegUserCircle } from 'react-icons/fa'
import { UserContext } from '../contexts/UserContext'
import { Link, useNavigate } from 'react-router'

const UserPopover = () => {
  const { userDetails, setToken } = useContext(UserContext)
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
              <Popover.Title textStyle="xl" fontWeight="bold" paddingBottom={4}>
                <VStack lineHeight="10px">
                  {userDetails ? (
                    <>
                      <Text textStyle="xs">Signed in as</Text>
                      <Text>{userDetails.firstname + ' ' + userDetails.lastname}</Text>
                      <Box paddingTop={2}>
                        <Link to="/profile">
                          <HStack textStyle="xs" gap="5px">
                            View Profile
                            <FaExternalLinkAlt />
                          </HStack>
                        </Link>
                      </Box>
                    </>
                  ) : (
                    'Not signed in'
                  )}
                </VStack>
              </Popover.Title>
              {userDetails ? (
                <Button
                  colorPalette="cyan"
                  variant="subtle"
                  onClick={() => {
                    localStorage.setItem('token', '')
                    setToken('')
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button
                    colorPalette="cyan"
                    variant="subtle"
                    onClick={() => navigate('/signin')}
                  >
                    Sign in
                  </Button>
                  <Button
                    colorPalette="cyan"
                    variant="subtle"
                    onClick={() => navigate('/register')}
                  >
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
