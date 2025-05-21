import { createBrowserRouter } from 'react-router'
import { BrowsePage } from './pages/BrowsePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SigninPage } from './pages/SigninPage'
import { CartPage } from './pages/CartPage'
import { ProfilePage } from './pages/ProfilePage'
import { CheckoutPage } from './pages/CheckoutPage'

const router = createBrowserRouter([
  {
    path: '/',
    loader: () => {
      return { searchText: '' }
    },
    element: <BrowsePage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/search/:searchText',
    loader: ({ params }) => {
      return { ...params }
    },
    element: <BrowsePage />,
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
    path: '/cart',
    element: <CartPage />,
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
