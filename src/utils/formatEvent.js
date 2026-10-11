// takes the event object from the api and returns only the fields we need
export function formatEvent(event) {
  const venue = event._embedded && event._embedded.venues ? event._embedded.venues[0] : null
  const classification = event.classifications ? event.classifications[0] : null

  // try to find a bigger image
  let image = ''
  if (event.images && event.images.length > 0) {
    const big = event.images.find((img) => img.width > 600 && img.ratio === '16_9')
    image = big ? big.url : event.images[0].url
  }

  return {
    id: event.id,
    name: event.name,
    date: event.dates?.start?.localDate || '',
    time: event.dates?.start?.localTime || '',
    status: event.dates?.status?.code || '',
    venue: venue ? venue.name : 'Venue not available',
    city: venue && venue.city ? venue.city.name : '',
    country: venue && venue.country ? venue.country.name : '',
    address: venue && venue.address ? venue.address.line1 : '',
    category: classification && classification.segment ? classification.segment.name : 'Other',
    genre: classification && classification.genre ? classification.genre.name : '',
    image: image,
    url: event.url,
  }
}

export function formatDate(date) {
  if (!date) return 'Date TBA'
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function formatTime(time) {
  if (!time) return 'Time TBA'
  const [h, m] = time.split(':')
  let hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12 || 12
  return `${hour}:${m} ${ampm}`
}
