import { createContext, useState } from 'react'
import useUserDetails, { UserDetails } from '../effects/useUserDetails'

export type UserContextType = {
  userDetails: UserDetails | null
  setToken: React.Dispatch<React.SetStateAction<string>>
}

export const UserContext = createContext<UserContextType | null>(null)

export const UserContextProvider = ({ children }: { children: any }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '')

  const { userDetails } = useUserDetails(token)

  return (
    <UserContext.Provider value={{ userDetails: userDetails, setToken }}>
      {children}
    </UserContext.Provider>
  )
}
