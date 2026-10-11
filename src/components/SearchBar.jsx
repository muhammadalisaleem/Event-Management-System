import { useState } from 'react'

export const CATEGORIES = ['Music', 'Sports', 'Arts & Theatre', 'Film', 'Family', 'Miscellaneous']

function SearchBar({ initialValues, onSearch }) {
  const [keyword, setKeyword] = useState(initialValues.keyword || '')
  const [city, setCity] = useState(initialValues.city || '')
  const [category, setCategory] = useState(initialValues.category || '')
  const [startDate, setStartDate] = useState(initialValues.startDate || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch({ keyword: keyword.trim(), city: city.trim(), category, startDate })
  }

  const handleClear = () => {
    setKeyword('')
    setCity('')
    setCategory('')
    setStartDate('')
    onSearch({ keyword: '', city: '', category: '', startDate: '' })
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search events..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <button type="submit">Search</button>
      <button type="button" className="btn-grey" onClick={handleClear}>Clear</button>
    </form>
  )
}

export default SearchBar
