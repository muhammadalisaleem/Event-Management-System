import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { fetchEvents } from '../features/eventsSlice'
import EventCard from '../components/EventCard'
import SearchBar from '../components/SearchBar'
import Loader from '../components/Loader'

function Events() {
  const dispatch = useDispatch()
  const { list, loading, error, totalPages, currentPage } = useSelector((state) => state.events)

  // keep filters in the url so they stay after refresh
  const [searchParams, setSearchParams] = useSearchParams()
  const keyword = searchParams.get('keyword') || ''
  const city = searchParams.get('city') || ''
  const category = searchParams.get('category') || ''
  const startDate = searchParams.get('date') || ''
  const page = parseInt(searchParams.get('page')) || 0

  useEffect(() => {
    dispatch(fetchEvents({ keyword, city, category, startDate, page }))
  }, [dispatch, keyword, city, category, startDate, page])

  const handleSearch = (values) => {
    const params = {}
    if (values.keyword) params.keyword = values.keyword
    if (values.city) params.city = values.city
    if (values.category) params.category = values.category
    if (values.startDate) params.date = values.startDate
    setSearchParams(params)
  }

  const changePage = (newPage) => {
    const params = Object.fromEntries(searchParams)
    params.page = newPage
    setSearchParams(params)
    window.scrollTo(0, 0)
  }

  return (
    <div>
      <h2>Explore Events</h2>
      <SearchBar
        key={searchParams.toString()}
        initialValues={{ keyword, city, category, startDate }}
        onSearch={handleSearch}
      />

      {loading && <Loader />}
      {error && <p className="error">{error}</p>}

      {!loading && !error && list.length === 0 && (
        <p className="empty">No events found. Try a different search.</p>
      )}

      {!loading && !error && list.length > 0 && (
        <>
          <div className="event-grid">
            {list.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          <div className="pagination">
            <button disabled={currentPage === 0} onClick={() => changePage(currentPage - 1)}>
              Previous
            </button>
            <span>
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              disabled={currentPage + 1 >= totalPages}
              onClick={() => changePage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Events
