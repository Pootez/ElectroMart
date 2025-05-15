import { UserContextProvider } from './contexts/UserContext'
import { Provider } from './components/ui/provider'
import { SearchContextProvider } from './contexts/SearchContext'

const App = ({ children }: { children: any }) => {
  return (
    <Provider>
      <SearchContextProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </SearchContextProvider>
    </Provider>
  )
}

export default App
