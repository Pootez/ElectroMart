import { useEffect, useState } from 'react'
import { getOrder, Order } from './useOrder'

export const useOrderList = (token: string, orderIds: string[]) => {
  const [orderList, setOrderList] = useState<(Order | undefined)[]>([])

  useEffect(() => {
    const loadOrders = async () => {
      const results = await Promise.all(
        orderIds.map(async (id) => {
          const order = await getOrder(token, id)
          return order
        })
      )
      setOrderList(results)
    }
    loadOrders()
  }, [orderIds])

  return orderList
}
