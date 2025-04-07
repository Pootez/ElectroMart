import { RouterProvider } from 'react-router'
import router from './router'
import App from './App'

const UserApp = () => {
  return (
    <App>
      <RouterProvider router={router} />
    </App>
  )
}

export default UserApp
