import { useEffect, useState } from 'react'

export type OrderItem = {
  id: string
  count: number
}

export type Order = {
  id: string
  total: number
  orderDate: string
  address: string
  status: string
  items: OrderItem[]
}

export async function getOrder(
  token: string,
  id: string
): Promise<Order | undefined> {
  try {
    const res = await fetch(`/api/orders/ID/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'auth-token': token },
    })
    if (!res.ok) throw new Error('Failed to fetch order')
    return await res.json()
  } catch (err) {
    console.error('getOrder error:', err)
    return undefined
  }
}

const useOrder = (token: string, id: string, deps: any[] = []) => {
  const [order, setOrder] = useState<Order | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    setLoading(true)
    setOrder(undefined)
    setError('')

    getOrder(token, id)
      .then((data) => {
        setOrder(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    return () => controller.abort()
  }, deps)

  return { order, isLoading, error }
}

export default useOrder
