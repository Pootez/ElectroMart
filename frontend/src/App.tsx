import React, { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router'
import router from './router'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    
  }, [])

  return <RouterProvider router={router} />
}

export default App
