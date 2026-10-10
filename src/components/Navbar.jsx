import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logoutUser } from '../features/authSlice'

function Navbar() {
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo-box">
        <span className="logo">EMS</span>
        <span className="tagline">Discover. Register. Attend.</span>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        <Link to="/categories">Categories</Link>
        {user ? (
          <>
            <Link to="/my-events">My Events</Link>
            <span className="nav-user">Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
