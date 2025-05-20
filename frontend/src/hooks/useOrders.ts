import { useEffect, useState } from 'react'
import { Product } from './useProducts'

export type Order = {
  id: string
  items: Product[]
}

const useOrder = (deps?: any[]) => {
  const [products, setProducts] = useState<Order[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {

      const controller = new AbortController()

      setLoading(true)
      setProducts([])
      setError('')

      fetch('/api/', {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          setProducts(json)
          setLoading(false)
        })
        .catch((err) => {
          setError(err.message)
          setLoading(false)
        })

      return () => controller.abort()
    },
    deps ? [...deps] : []
  )

  return { products, isLoading, error }
}

export default useOrder
