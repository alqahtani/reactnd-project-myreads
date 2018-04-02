import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Book from './Book'

class Shelf extends Component {
  static PropTypes = {
    shelfTitle: PropTypes.string.isRequired,
    booksList: PropTypes.array.isRequired,
    onUpdateReadingStatus: PropTypes.func.isRequired
  }

  render() {
    const { shelfTitle, booksList, onUpdateReadingStatus } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {booksList.map(book => (
              <li key={book.id}><Book book={book} onUpdateReadingStatus={(book, shelf) => onUpdateReadingStatus(book, shelf)} /></li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf