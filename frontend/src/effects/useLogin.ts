import { useEffect, useState } from 'react'

export type UserDetails = {
  name: string
}

const useLogin = (username: string, password: string, deps?: any[]) => {
  const [token, setToken] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      if (!isLoading) return

      if (!username || password) {
        setError('Missing username or password')
        setToken('')
      }

      const controller = new AbortController()

      setToken('')
      setError('')

      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json?.token) {
            setToken(json.token)
          }
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

      return () => controller.abort()
    },
    deps ? [...deps, isLoading] : [isLoading]
  )

  return { token, isLoading, setLoading, error }
}

export default useLogin
