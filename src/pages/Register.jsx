import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, clearError } from '../features/authSlice'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [formError, setFormError] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, error } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (user) {
      navigate('/events')
    }
  }, [user, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim() === '' || email.trim() === '' || password === '') {
      setFormError('Please fill all the fields')
      return
    }
    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email')
      return
    }
    if (password.length < 6) {
      setFormError('Password must be at least 6 characters')
      return
    }
    if (password !== confirm) {
      setFormError('Passwords do not match')
      return
    }
    setFormError('')
    dispatch(registerUser({ name: name.trim(), email: email.trim(), password }))
  }

  return (
    <div className="form-page">
      <form className="form-box" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {(formError || error) && <p className="error">{formError || error}</p>}

        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm Password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />

        <button type="submit">Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Register
