import { useEffect, useState } from 'react'
import { SearchParamsType } from '../contexts/SearchContext'

export type Product = {
  id: string
  name: string
  price: number
  description: string
  stockquantity: number
  brand: { id: number; name: string }
  category: { id: number; name: string }
}

const useProducts = (searchParams: SearchParamsType, deps?: any[]) => {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(
    () => {
      const controller = new AbortController()

      setLoading(true)
      setProducts([])
      setError('')

      const apiParams = Object.entries(searchParams)
        .filter(([_, value]) => !!value)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
      const endpoint = !apiParams ? '/api/products/all' : '/api/products/search?' + apiParams

      fetch(endpoint, {
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
    deps ? [...deps, searchParams] : [searchParams]
  )

  return { products, isLoading, error }
}

export default useProducts
