import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEvents } from '../features/eventsSlice'
import EventCard from '../components/EventCard'
import Loader from '../components/Loader'
import { CATEGORIES } from '../components/SearchBar'

function Home() {
  const dispatch = useDispatch()
  const { list, loading, error } = useSelector((state) => state.events)
  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(fetchEvents({ page: 0 }))
  }, [dispatch])

  return (
    <div>
      <div className="hero">
        <h1>Find events you love</h1>
        <p>Concerts, sports, theatre and more. Browse events and register in one click.</p>
        <Link to="/events" className="btn-link">Explore Events</Link>
        {!user && (
          <Link to="/register" className="btn-link btn-white">Create Account</Link>
        )}
      </div>

      <h2>Browse by Category</h2>
      <div className="category-row">
        {CATEGORIES.map((c) => (
          <Link key={c} to={`/events?category=${encodeURIComponent(c)}`} className="category-chip">
            {c}
          </Link>
        ))}
      </div>

      <h2>Upcoming Events</h2>
      {loading && <Loader />}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <div className="event-grid">
          {list.slice(0, 8).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
