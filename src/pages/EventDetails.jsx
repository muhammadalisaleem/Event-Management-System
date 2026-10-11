import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEventDetails } from '../features/eventsSlice'
import { formatEvent, formatDate, formatTime } from '../utils/formatEvent'
import Loader from '../components/Loader'

function EventDetails() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { selectedEvent, detailsLoading, detailsError } = useSelector((state) => state.events)

  useEffect(() => {
    dispatch(fetchEventDetails(id))
  }, [dispatch, id])

  if (detailsLoading) return <Loader />
  if (detailsError) return <p className="error">{detailsError}</p>
  if (!selectedEvent) return null

  const event = formatEvent(selectedEvent)
  const price = selectedEvent.priceRanges ? selectedEvent.priceRanges[0] : null
  const performers = selectedEvent._embedded?.attractions || []

  return (
    <div className="details">
      <Link to="/events">&larr; Back to events</Link>

      <div className="details-top">
        {event.image && <img src={event.image} alt={event.name} className="details-img" />}

        <div className="details-info">
          <span className="badge">{event.category}</span>
          {event.genre && event.genre !== 'Undefined' && <span className="badge">{event.genre}</span>}
          <h2>{event.name}</h2>
          <p><b>Date:</b> {formatDate(event.date)}</p>
          <p><b>Time:</b> {formatTime(event.time)}</p>
          <p><b>Venue:</b> {event.venue}</p>
          <p>
            <b>Location:</b> {event.address ? event.address + ', ' : ''}
            {event.city}{event.country ? ', ' + event.country : ''}
          </p>
          {price && (
            <p>
              <b>Price:</b> {price.min} - {price.max} {price.currency}
            </p>
          )}
          {event.status && <p><b>Status:</b> {event.status}</p>}
        </div>
      </div>

      {performers.length > 0 && (
        <div className="details-section">
          <h3>Performers</h3>
          <ul>
            {performers.map((p) => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
        </div>
      )}

      {selectedEvent.info && (
        <div className="details-section">
          <h3>About</h3>
          <p>{selectedEvent.info}</p>
        </div>
      )}

      {selectedEvent.pleaseNote && (
        <div className="details-section">
          <h3>Please Note</h3>
          <p>{selectedEvent.pleaseNote}</p>
        </div>
      )}

      {selectedEvent.seatmap && (
        <div className="details-section">
          <h3>Seat Map</h3>
          <img src={selectedEvent.seatmap.staticUrl} alt="Seat map" className="seatmap" />
        </div>
      )}

      <a href={event.url} target="_blank" rel="noreferrer" className="btn-link">
        Buy Tickets on Ticketmaster
      </a>
    </div>
  )
}

export default EventDetails
