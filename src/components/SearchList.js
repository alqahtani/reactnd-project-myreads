import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Book from './Book'

class SearchList extends Component {
  static PropTypes = {
    onUpdateReadingStatus: PropTypes.func.isRequired
  }
  
  render() {
    const { query, searchBooksList } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">

            <input type="text" placeholder="Search by title or author" value={query} onChange={(e) => this.props.onSearch(e.target.value)} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooksList.length > 0 && 
              searchBooksList.map(book => (
                <li key={book.id}>
                  <Book book={book} onUpdateReadingStatus={(book, shelf) => this.props.onUpdateReadingStatus(book, shelf)} />
                </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchList