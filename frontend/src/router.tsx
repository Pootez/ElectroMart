import { createBrowserRouter } from 'react-router'
import { BrowsePage } from './pages/BrowsePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SigninPage } from './pages/SigninPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { ProfilePage } from './pages/ProfilePage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BrowsePage />,
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
