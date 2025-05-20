import { Button, Field, Fieldset, Group, Input } from '@chakra-ui/react'
import { PasswordInput } from './ui/password-input'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import useRegister, { RegisterData } from '../effects/useRegister'
import { UserContext } from '../contexts/UserContext'
import { useForm } from 'react-hook-form'

const RegisterFieldset = () => {
  const [registerData, setRegisterData] = useState<RegisterData | undefined>()
  const { token, isLoading, error } = useRegister(registerData)
  const { userDetails, setToken } = useContext(UserContext)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>()

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
    <form onSubmit={handleSubmit((data) => {setRegisterData(data)})}>
      <Fieldset.Root size="lg" maxW="lg">
        <Fieldset.Content>
          <Field.Root invalid={!!errors.email}>
            <Field.Label>Email</Field.Label>
            <Input
              {...register('email', { required: 'Email is required.' })}
              placeholder="me@example.com"
            />
            <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
          </Field.Root>
          <Group w="full" attached>
            <Field.Root invalid={!!errors.firstName}>
              <Field.Label>First name</Field.Label>
              <Input
                {...register('firstName', {
                  required: 'First name is required.',
                })}
                placeholder="First name"
              />
            <Field.ErrorText>{errors.firstName?.message}</Field.ErrorText>
            </Field.Root>
            <Field.Root invalid={!!errors.lastName}>
              <Field.Label>Last name</Field.Label>
              <Input
                {...register('lastName', { required: 'Last name is required.' })}
                placeholder="Last name"
              />
            <Field.ErrorText>{errors.lastName?.message}</Field.ErrorText>
            </Field.Root>
          </Group>
          <Field.Root invalid={!!errors.phoneNumber}>
            <Field.Label>Phone number</Field.Label>
            <Input
              {...register('phoneNumber', { required: 'Phone number is required.' })}
              placeholder="111 22 333"
            />
            <Field.ErrorText>{errors.phoneNumber?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.password}>
            <Field.Label>Password</Field.Label>
            <PasswordInput
              {...register('password', {
                required: 'Password is required.',
                minLength: {
                  value: 6,
                  message: 'Password must be 6 characters or longer.',
                },
              })}
              placeholder="Password"
            />
            <Field.ErrorText>{errors.password?.message}</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={!!errors.confirmPassword}>
            <Field.Label>Confirm Password</Field.Label>
            <PasswordInput
              {...register('confirmPassword', {
                required: 'Password confirmation is required.',
                minLength: {
                  value: 6,
                  message: 'Password must be 6 characters or longer.',
                },
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return 'Passwords do not match.'
                  }
                },
              })}
              placeholder="Confirm Password"
              disableToggle
            />
            <Field.ErrorText>{errors.confirmPassword?.message}</Field.ErrorText>
          </Field.Root>
        </Fieldset.Content>
        <Button
          colorPalette="cyan"
          loading={isLoading}
          type="submit"
          variant="subtle"
          alignSelf="flex-start"
        >
          Register
        </Button>
      </Fieldset.Root>
      {error}
    </form>
  )
}
export default RegisterFieldset
