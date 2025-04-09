import { Link } from 'react-router'
import { AppGrid } from '../components/AppGrid'

export const NotFoundPage = () => {
  return (
    <AppGrid>
      <div className="flex flex-col gap-2">
        404 Not Found
        <Link to="/">Home</Link>
      </div>
    </AppGrid>
  )
}
