import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { cancelRegistration } from '../features/registrationsSlice'
import { formatDate, formatTime } from '../utils/formatEvent'

function MyEvents() {
  const [tab, setTab] = useState('upcoming')
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const byUser = useSelector((state) => state.registrations.byUser)
  const myEvents = byUser[user.email] || []

  const today = new Date().toISOString().split('T')[0]
  const upcoming = myEvents.filter((e) => !e.date || e.date >= today)
  const completed = myEvents.filter((e) => e.date && e.date < today)

  const shownEvents = tab === 'upcoming' ? upcoming : completed

  const handleCancel = (event) => {
    if (window.confirm(`Cancel registration for "${event.name}"?`)) {
      dispatch(cancelRegistration({ email: user.email, eventId: event.id }))
      setMessage(`Registration for "${event.name}" was cancelled.`)
    }
  }

  return (
    <div>
      <h2>My Events</h2>
      <p>You have registered for {myEvents.length} event(s).</p>

      <div className="tabs">
        <button
          className={tab === 'upcoming' ? 'tab active' : 'tab'}
          onClick={() => setTab('upcoming')}
        >
          Upcoming ({upcoming.length})
        </button>
        <button
          className={tab === 'completed' ? 'tab active' : 'tab'}
          onClick={() => setTab('completed')}
        >
          Completed ({completed.length})
        </button>
      </div>

      {message && <p className="success">{message}</p>}

      {shownEvents.length === 0 ? (
        <p className="empty">
          No {tab} events. <Link to="/events">Browse events</Link>
        </p>
      ) : (
        <div className="my-events-list">
          {shownEvents.map((event) => (
            <div className="my-event" key={event.id}>
              {event.image && <img src={event.image} alt={event.name} />}
              <div className="my-event-info">
                <h3>{event.name}</h3>
                <p>{formatDate(event.date)} - {formatTime(event.time)}</p>
                <p>{event.venue}{event.city ? ', ' + event.city : ''}</p>
                {tab === 'completed' && <span className="badge">Completed</span>}
              </div>
              <div className="my-event-actions">
                <Link to={`/events/${event.id}`}>Details</Link>
                {tab === 'upcoming' && (
                  <button className="btn-red" onClick={() => handleCancel(event)}>
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyEvents
