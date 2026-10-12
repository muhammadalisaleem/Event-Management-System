import { Link } from 'react-router-dom'

const categoryList = [
  { name: 'Music', text: 'Concerts, festivals and live music shows.' },
  { name: 'Sports', text: 'Football, basketball, baseball, hockey and more.' },
  { name: 'Arts & Theatre', text: 'Plays, musicals, comedy and dance shows.' },
  { name: 'Film', text: 'Movie screenings and film festivals.' },
  { name: 'Family', text: 'Fun events for kids and the whole family.' },
  { name: 'Miscellaneous', text: 'Other events like expos, fairs and tours.' },
]

function Categories() {
  return (
    <div>
      <h2>Event Categories</h2>
      <p>Pick a category to see upcoming events.</p>
      <div className="category-grid">
        {categoryList.map((cat) => (
          <Link
            key={cat.name}
            to={`/events?category=${encodeURIComponent(cat.name)}`}
            className="category-card"
          >
            <h3>{cat.name}</h3>
            <p>{cat.text}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Categories
