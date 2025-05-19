import { useEffect, useState } from 'react'
import { Product } from './useProducts'

const useProduct = (id: string, deps?: any[]) => {
  const [product, setProduct] = useState<Product | null>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      const controller = new AbortController()

      setLoading(true)
      setProduct(null)
      setError('')

      fetch('/api/product/' + id, {
        method: 'GET',
        headers: { 'Content-type': 'application/json' },
      })
        .then((res) => res.json())
        .then((json) => {
          setProduct(json)
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

  return { product, isLoading, error }
}
export default useProduct
