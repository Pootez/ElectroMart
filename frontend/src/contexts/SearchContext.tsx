import { createContext, useState } from 'react'
import useProducts, { Product } from '../effects/useProducts'

export type SearchParamsType = {
  text: string
  category: string
  brand: string
  minPrice: number
  maxPrice: number
  page: number
}

const defaultSearchParams = {
  text: '',
  category: '',
  brand: '',
  minPrice: 0,
  maxPrice: 0,
  page: 1,
}

export type SearchContextType = {
  searchParams: SearchParamsType
  setSearchParams: React.Dispatch<React.SetStateAction<SearchParamsType>>
  products: Product[]
  isLoading: boolean
  error: string
}

export const SearchContext = createContext<SearchContextType>({
  searchParams: defaultSearchParams,
  setSearchParams: () => {},
  products: [],
  isLoading: false,
  error: ''
})

export const SearchContextProvider = ({ children }: { children: any }) => {
  const [searchParams, setSearchParams] =
    useState<SearchParamsType>(defaultSearchParams)

  const { products, isLoading, error } = useProducts(searchParams)

  return (
    <SearchContext.Provider value={{ searchParams, setSearchParams, products, isLoading, error }}>
      {children}
    </SearchContext.Provider>
  )
}
