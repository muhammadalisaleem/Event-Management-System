import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'

// only logged in users can see the page
function ProtectedRoute({ children }) {
  const user = useSelector((state) => state.auth.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }
  return children
}

export default ProtectedRoute
