import { useEffect, useState } from 'react'
import { Product } from './useProducts'

export async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const res = await fetch(`/api/products/ID/${id}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
    if (!res.ok) throw new Error('Failed to fetch product')
    return await res.json()
  } catch (err) {
    console.error('getProduct error:', err)
    return undefined
  }
}

const useProduct = (id: string, deps?: any[]) => {
  const [product, setProduct] = useState<Product | undefined>()
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      const controller = new AbortController()

      setLoading(true)
      setProduct(undefined)
      setError('')

      getProduct(id)
        .then((data) => {
          setProduct(data)
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
