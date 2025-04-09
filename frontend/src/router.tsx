import { createBrowserRouter } from 'react-router'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SigninPage } from './pages/SigninPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ProfilePage } from './pages/ProfilePage'
import { RegisterPage } from './pages/RegisterPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/signin',
    element: <SigninPage type="signin" />,
  },
  {
    path: '/register',
    element: <SigninPage type="register" />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
])

export default router
