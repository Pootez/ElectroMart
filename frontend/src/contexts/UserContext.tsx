import { createContext, useState } from 'react'
import useUserDetails, { UserDetails } from '../hooks/useUserDetails'

export type UserContextType = {
  userDetails: UserDetails | undefined
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserContextType>({
  userDetails: undefined,
  token: '',
  setToken: () => {},
})

export const UserContextProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const { userDetails } = useUserDetails(token)

  return (
    <UserContext.Provider value={{ userDetails, token, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
