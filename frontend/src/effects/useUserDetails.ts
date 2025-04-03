import { useEffect, useState } from 'react'

export type UserDetails = {
  name: string
}

const useUserDetails = (token: string, deps?: any[]) => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      if (!token) {
        setError('No token provided')
        setUserDetails(null)
      }

      const controller = new AbortController()

      setLoading(true)
      setUserDetails(null)
      setError('')

      fetch('/api/auth/userDetails', {
        method: 'GET',
        headers: { 'Content-type': 'application/json', 'auth-token': token },
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.userDetails?.name) {
            console.log(json)
            setUserDetails({name: json.userDetails.name})
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
