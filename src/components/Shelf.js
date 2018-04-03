import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

const Shelf = (props) => {
  const { shelfTitle, booksList, onUpdateReadingStatus } = props

  return (
    <div className='bookshelf'>
      <h2 className='bookshelf-title'>{shelfTitle}</h2>
      <div className='bookshelf-books'>
        <ol className='books-grid'>
          {booksList.map(book => (
            <li key={book.id}><Book book={book} onUpdateReadingStatus={(book, shelf) => onUpdateReadingStatus(book, shelf)} /></li>
          ))}
        </ol>
      </div>
    </div>
  )
}

Shelf.prototype = {
  shelfTitle: PropTypes.string.isRequired,
  booksList: PropTypes.array.isRequired,
  onUpdateReadingStatus: PropTypes.func.isRequired
}

export default Shelf