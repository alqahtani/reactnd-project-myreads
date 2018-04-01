import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Shelf from './Shelf'

class ListBooks extends Component {

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf shelfTitle='Currently Reading' booksList={this.props.booksList.filter(book => book.shelf === 'currentlyReading')} onUpdateReadingStatus={(book, shelf) => this.props.onUpdateReadingStatus(book, shelf)} />

            <Shelf shelfTitle='Want to Read' booksList={this.props.booksList.filter(book => book.shelf === 'wantToRead')} onUpdateReadingStatus={(book, shelf) => this.props.onUpdateReadingStatus(book, shelf)} />
            
            <Shelf shelfTitle='Read' booksList={this.props.booksList.filter(book => book.shelf === 'read')} onUpdateReadingStatus={(book, shelf) => this.props.onUpdateReadingStatus(book, shelf)} /> 
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks