import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { loginUser, clearError } from '../features/authSlice'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, error } = useSelector((state) => state.auth)

  // page to go back to after login
  const from = location.state?.from || '/events'

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      navigate(from)
    }
  }, [user, navigate, from])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email.trim() === '' || password === '') {
      setFormError('Please enter email and password')
      return
    }
    setFormError('')
    dispatch(loginUser({ email: email.trim(), password }))
  }

  return (
    <div className="form-page">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {(formError || error) && <p className="error">{formError || error}</p>}

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
