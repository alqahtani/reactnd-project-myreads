import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class SearchList extends Component {
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
  }

  componentDidUpdate = () => {
    this.searchForTerm(this.state.query)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onUpdateSearchInput} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.booksList.map(book => (
              <li key={book.id}><Book book={book} onUpdateReadingStatus={(book, shelf) => this.props.onUpdateReadingStatus(book, shelf)} /></li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchList