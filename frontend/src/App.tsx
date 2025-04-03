import { createContext } from 'react'
import { RouterProvider } from 'react-router'
import router from './router'
import { UserContextProvider } from './contexts/UserContext'

export const AppContext = createContext({ isSignedIn: false })

const App = () => {

  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  )
}

export default App
