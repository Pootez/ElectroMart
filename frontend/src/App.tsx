import { UserContextProvider } from './contexts/UserContext'
import { Provider } from './components/ui/provider'
import { SearchContextProvider } from './contexts/SearchContext'
import { CartContextProvider } from './contexts/CartContext'

const App = ({ children }: { children: any }) => {
  return (
    <Provider>
      <CartContextProvider>
        <SearchContextProvider>
          <UserContextProvider>{children}</UserContextProvider>
        </SearchContextProvider>
      </CartContextProvider>
    </Provider>
  )
}

export default App
