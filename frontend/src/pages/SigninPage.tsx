import { useContext, useEffect, useState } from 'react'
import useLogin from '../effects/useLogin'
import { UserContext, UserContextType } from '../contexts/UserContext'
import { useNavigate } from 'react-router'
import { AppGrid } from '../components/AppGrid'

export const SigninPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { token, isLoading, setLoading, error } = useLogin(username, password)
  const { userDetails, setToken } = useContext(UserContext) as UserContextType
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (!token) return

    localStorage.setItem('token', token)
    setToken(token)
  }, [token])

  useEffect(() => {
    if (!userDetails) return
    navigate('/')
  }, [userDetails])

  return (
    <AppGrid>
      <div className="flex flex-col gap-2">
        Sign in
        <div>
          Username:
          <input
            type="text"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          Password:
          <input
            type="text"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>
        <button onClick={() => {setLoading(!isLoading)}}>
          Sign in
        </button>
        {error && error}
        {userDetails && userDetails.username}
      </div>
    </AppGrid>
  )
}
