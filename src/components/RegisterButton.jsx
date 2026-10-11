import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerEvent, cancelRegistration } from '../features/registrationsSlice'

function RegisterButton({ event }) {
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const user = useSelector((state) => state.auth.user)
  const byUser = useSelector((state) => state.registrations.byUser)
  const myEvents = user && byUser[user.email] ? byUser[user.email] : []
  const isRegistered = myEvents.some((e) => e.id === event.id)

  const today = new Date().toISOString().split('T')[0]
  const isPast = event.date && event.date < today

  if (!user) {
    return (
      <button onClick={() => navigate('/login', { state: { from: location.pathname } })}>
        Login to Register
      </button>
    )
  }

  const handleRegister = () => {
    if (isRegistered) {
      setMessage('You are already registered for this event.')
      return
    }
    dispatch(registerEvent({ email: user.email, event }))
    setMessage('You have successfully registered for this event!')
  }

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel your registration?')) {
      dispatch(cancelRegistration({ email: user.email, eventId: event.id }))
      setMessage('Your registration has been cancelled.')
    }
  }

  return (
    <div className="register-box">
      {isPast ? (
        <p>This event has already happened.</p>
      ) : isRegistered ? (
        <>
          <button disabled>Registered</button>
          <button className="btn-red" onClick={handleCancel}>Cancel Registration</button>
        </>
      ) : (
        <button onClick={handleRegister}>Register for Event</button>
      )}
      {message && <p className="success">{message}</p>}
    </div>
  )
}

export default RegisterButton
