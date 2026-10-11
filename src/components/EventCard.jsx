import { Link } from 'react-router-dom'
import { formatDate, formatTime } from '../utils/formatEvent'

function EventCard({ event }) {
  return (
    <div className="event-card">
      {event.image ? (
        <img src={event.image} alt={event.name} />
      ) : (
        <div className="no-image">No Image</div>
      )}
      <div className="event-card-body">
        <span className="badge">{event.category}</span>
        <h3>{event.name}</h3>
        <p><b>Date:</b> {formatDate(event.date)} - {formatTime(event.time)}</p>
        <p><b>Venue:</b> {event.venue}{event.city ? ', ' + event.city : ''}</p>
        <Link to={`/events/${event.id}`} className="btn-link">View Details</Link>
      </div>
    </div>
  )
}

export default EventCard
