import { useContext } from 'react'
import { UserContext, UserContextType } from '../contexts/UserContext'

export const HomePage = () => {
  const { userDetails } = useContext(UserContext) as UserContextType

  return (
    <div>
      HomePage
      {userDetails && 'Signed in as ' + userDetails.name}
    </div>
  )
}
