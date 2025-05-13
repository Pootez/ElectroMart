import { useEffect, useState } from 'react'

export type Product = {
  id: string
  name: string
  price: number
}

const useProducts = (deps?: any[]) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {

      const controller = new AbortController()

      setLoading(true)
      setProducts([])
      setError('')

      fetch('/api/products', {
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

export default useProducts
