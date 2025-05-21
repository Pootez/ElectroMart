import { useEffect, useState } from 'react'

export type CheckoutData = {
  items: { id: string; count: number }[]
}

export const useCheckout = (
  token: string,
  data?: CheckoutData,
  deps?: any[]
) => {
  const [orderId, setOrderId] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      const controller = new AbortController()
      if (!token) return setError('Not signed in')
      if (!data) return

      setLoading(true)
      setOrderId('')
      setError('')

      fetch('/api/orders/checkout', {
        method: 'POST',
        headers: { 'Content-type': 'application/json', 'auth-token': token },
        body: JSON.stringify(data),
      })
        .then(async (res) => {
          if (res.ok) {
            const json = await res.json()
            if (json?.orderId) {
              setOrderId(json.orderId)
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

  return { orderId, isLoading, error }
}
