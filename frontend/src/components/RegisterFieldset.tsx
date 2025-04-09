import { Button, Field, Fieldset, Input } from '@chakra-ui/react'
import { PasswordInput } from './ui/password-input'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useRegister from '../effects/useRegister'
import { UserContext, UserContextType } from '../contexts/UserContext'

const RegisterFieldset = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { token, isLoading, setLoading, error } = useRegister(
    username,
    password
  )
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
    <Fieldset.Root size="lg" maxW="lg">
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
        colorPalette="cyan"
        disabled={!(!!username && !!password)}
        loading={isLoading}
        type="submit"
        variant="subtle"
        alignSelf="flex-start"
        onClick={() => {
          setLoading(!isLoading)
        }}
      >
        Register
      </Button>
      {error && error}
    </Fieldset.Root>
  )
}
export default RegisterFieldset
