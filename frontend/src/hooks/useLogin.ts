import { useEffect, useState } from 'react'

export type UserDetails = {
  name: string
}

export type LoginData = {
  email: string
  password: string
}

const useLogin = (data?: LoginData, deps?: any[]) => {
  const [token, setToken] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      const controller = new AbortController()

      if (!data) return

      setLoading(true)
      setToken('')
      setError('')

      fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data),
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
    deps ? [...deps, data] : [data]
  )

  return { token, isLoading, error }
}

export default useLogin
