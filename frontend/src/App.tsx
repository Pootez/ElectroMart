import { UserContextProvider } from './contexts/UserContext'
import { Provider } from './components/ui/provider'
import { CartContextProvider } from './contexts/CartContext'

const App = ({ children }: { children: any }) => {
  return (
    <Provider>
      <CartContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </CartContextProvider>
    </Provider>
  )
}

export default App
