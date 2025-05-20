import { Button, Field, Fieldset, Input } from '@chakra-ui/react'
import { PasswordInput } from './ui/password-input'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useLogin, { LoginData } from '../hooks/useLogin'
import { UserContext } from '../contexts/UserContext'
import { useForm } from 'react-hook-form'

const SigninFieldset = () => {
  const [loginData, setLoginData] = useState<LoginData | undefined>()
  const { token, isLoading, error } = useLogin(loginData)
  const { userDetails, setToken } = useContext(UserContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>()

  useEffect(() => {
    if (isLoading) return
    if (!token) return

    localStorage.setItem('token', token)
    setToken(token)
  }, [token, isLoading])

  useEffect(() => {
    if (!userDetails) return
    navigate('/')
  }, [userDetails])

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setLoginData(data)
      })}
    >
      <Fieldset.Root invalid size="lg" maxW="lg">
        <Fieldset.Content>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              {...register('email', { required: 'Email is required.' })}
              placeholder="Email"
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              {...register('password', {
                required: 'Password is required.',
              })}
              placeholder="Password"
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        <Button
          colorPalette="cyan"
          loading={isLoading}
          type="submit"
          variant="subtle"
          alignSelf="flex-start"
        >
          Sign in
        </Button>
        {error}
      </Fieldset.Root>
    </form>
  )
}
export default SigninFieldset
