import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Book from './Book'

const SearchList = (props) => {
  const { 
    query, 
    searchBooksList,
    onSearch,
    onUpdateReadingStatus,
    onClearQuery 
  } = props

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/' onClick={onClearQuery}>Close</Link>
        <div className="search-books-input-wrapper">

          <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => onSearch(e.target.value)} />

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchBooksList.length > 0 && 
            searchBooksList.map(book => (
              <li key={book.id}>
                <Book book={book} onUpdateReadingStatus={(book, shelf) => onUpdateReadingStatus(book, shelf)} />
              </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

SearchList.propTypes = {
  onUpdateReadingStatus: PropTypes.func.isRequired,
  query: PropTypes.string, 
  searchBooksList: PropTypes.array,
  onSearch: PropTypes.func.isRequired,
  onClearQuery: PropTypes.func.isRequired
}

export default SearchList