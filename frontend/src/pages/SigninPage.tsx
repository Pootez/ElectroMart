import { useContext, useEffect, useState } from 'react'
import useLogin from '../effects/useLogin'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import { AppGrid } from '../components/AppGrid'
import {
  Button,
  Card,
  Field,
  Fieldset,
  Input,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { PasswordInput } from '../components/ui/password-input'

export const SigninPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { token, isLoading, setLoading, error } = useLogin(username, password)
  const { userDetails, setToken } = useContext(UserContext) as UserContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (!token) return

    localStorage.setItem('token', token)
    setToken(token)
  }, [token])

  useEffect(() => {
    if (!userDetails) return
    navigate('/')
  }, [userDetails])

  return (
    <AppGrid>
      <VStack justifyContent="center" alignItems="center" h="100%">
        <Card.Root>
          <Card.Body>
            <Fieldset.Root size="lg" maxW="lg">
              <Stack>
                <Fieldset.Legend>Sign in</Fieldset.Legend>
              </Stack>
              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input
                    name="username"
                    placeholder="Username"
                    onChange={(e) => {
                      setUsername(e.target.value)
                    }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    name="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </Field.Root>
              </Fieldset.Content>
              <Button
                loading={isLoading}
                type="submit"
                variant="subtle"
                alignSelf="flex-start"
                onClick={() => {
                  setLoading(!isLoading)
                }}
              >
                Sign in
              </Button>
              {error && error}
            </Fieldset.Root>
          </Card.Body>
        </Card.Root>
      </VStack>
    </AppGrid>
  )
}
