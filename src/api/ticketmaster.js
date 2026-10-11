const API_KEY = import.meta.env.VITE_TM_API_KEY
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2'

// get list of events with search and filter options
export async function getEvents(filters) {
  const params = new URLSearchParams()
  params.append('apikey', API_KEY)
  params.append('size', 12)
  params.append('sort', 'date,asc')
  params.append('page', filters.page || 0)

  if (filters.keyword) params.append('keyword', filters.keyword)
  if (filters.city) params.append('city', filters.city)
  if (filters.category) params.append('classificationName', filters.category)
  if (filters.countryCode) params.append('countryCode', filters.countryCode)

  // only show upcoming events (from start date or today)
  let start = new Date()
  if (filters.startDate) {
    start = new Date(filters.startDate)
  }
  params.append('startDateTime', start.toISOString().split('.')[0] + 'Z')

  const res = await fetch(`${BASE_URL}/events.json?${params.toString()}`)
  if (!res.ok) {
    throw new Error('Could not load events. Please check your API key.')
  }
  const data = await res.json()
  return {
    events: data._embedded ? data._embedded.events : [],
    page: data.page,
  }
}

// get one event by id
export async function getEventById(id) {
  const res = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`)
  if (!res.ok) {
    throw new Error('Event not found')
  }
  return await res.json()
}
