import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchList extends Component {
  static PropTypes = {
    onUpdateReadingStatus: PropTypes.func.isRequired
  }

  state = {
    booksList: [],
    query: ''
  }

  searchForTerm = (term) => {
    if(this.state.query !== '') {
      BooksAPI.search(term)
        .then((data) => {
          this.setState(() => ({
            booksList: data
          }))
        })
    }
  }

  onUpdateSearchInput = (e) => {
     this.setState({query: e.target.value})
     this.searchForTerm(this.state.query)
  }

  render() {
    const { booksList, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
          
            <input type="text" placeholder="Search by title or author" value={query} onChange={this.onUpdateSearchInput} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksList.length > 0 && 
              booksList.map(book => (
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