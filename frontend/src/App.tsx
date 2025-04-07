import { UserContextProvider } from './contexts/UserContext'
import { Provider } from './components/ui/provider'

const App = ({ children }: { children: any }) => {
  return (
    <Provider>
      <UserContextProvider>{children}</UserContextProvider>
    </Provider>
  )
}

export default App
