import { AppGrid } from '../components/AppGrid'
import { Card, Tabs, VStack } from '@chakra-ui/react'
import SigninFieldset from '../components/SigninFieldset'
import RegisterFieldset from '../components/RegisterFieldset'
import { useNavigate } from 'react-router'

export const SigninPage = ({ type = 'signin' }: { type?: string }) => {
  const navigate = useNavigate()
  return (
    <AppGrid>
      <VStack justifyContent="center" alignItems="center" h="100%">
        <Card.Root>
          <Card.Body>
            <Tabs.Root value={type}>
              <Tabs.List>
                <Tabs.Trigger
                  value="signin"
                  onClick={() => navigate('/signin')}
                >
                  Sign in
                </Tabs.Trigger>
                <Tabs.Trigger
                  value="register"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Tabs.Trigger>
              </Tabs.List>
              <Tabs.Content value="signin">
                <SigninFieldset />
              </Tabs.Content>
              <Tabs.Content value="register">
                <RegisterFieldset />
              </Tabs.Content>
            </Tabs.Root>
          </Card.Body>
        </Card.Root>
      </VStack>
    </AppGrid>
  )
}
