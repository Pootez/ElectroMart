import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import UserApp from './UserApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserApp />
  </StrictMode>
)
