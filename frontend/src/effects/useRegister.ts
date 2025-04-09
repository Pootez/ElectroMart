import { useEffect, useState } from 'react'

export type UserDetails = {
  name: string
}

const useRegister = (username: string, password: string, deps?: any[]) => {
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

      fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ username: username, password: password }),
      })
      .then(async (res) => {
        if (res.ok) {
          const json = await res.json()
          if (json?.token) {
            setToken(json.token)
          }
        } else {
          const errorText = await (await res.blob()).text()
          setError(errorText)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.log('Error', { err })
        setError(err.message)
        setLoading(false)
      })

      return () => controller.abort()
    },
    deps ? [...deps, isLoading] : [isLoading]
  )

  return { token, isLoading, setLoading, error }
}

export default useRegister
