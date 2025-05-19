import { useEffect, useState } from 'react'

export type UserDetails = {
  username: string
}

const useUserDetails = (token: string, deps?: any[]) => {
  const [userDetails, setUserDetails] = useState<UserDetails | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      if (!token) {
        setError('No token provided')
        setUserDetails(undefined)
      }

      const controller = new AbortController()

      setLoading(true)
      setUserDetails(undefined)
      setError('')

      fetch('/api/auth/userDetails', {
        method: 'GET',
        headers: { 'Content-type': 'application/json', 'auth-token': token },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.username) {
            setUserDetails({username: json.username})
          }
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

      return () => controller.abort()
    },
    deps ? [...deps] : [token]
  )

  return { userDetails, isLoading, error }
}

export default useUserDetails
