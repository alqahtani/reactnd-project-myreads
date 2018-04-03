import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Shelf from './Shelf'

const ListBooks = (props) => {
  const { booksList, onUpdateReadingStatus } = props

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf shelfTitle='Currently Reading' booksList={booksList.filter(book => book.shelf === 'currentlyReading')} onUpdateReadingStatus={(book, shelf) => onUpdateReadingStatus(book, shelf)} />

          <Shelf shelfTitle='Want to Read' booksList={booksList.filter(book => book.shelf === 'wantToRead')} onUpdateReadingStatus={(book, shelf) => onUpdateReadingStatus(book, shelf)} />
          
          <Shelf shelfTitle='Read' booksList={booksList.filter(book => book.shelf === 'read')} onUpdateReadingStatus={(book, shelf) => onUpdateReadingStatus(book, shelf)} /> 
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  booksList: PropTypes.array.isRequired,
  onUpdateReadingStatus: PropTypes.func.isRequired
}

export default ListBooks