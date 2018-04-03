import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'

import ListBooks from './components/ListBooks';
import SearchList from './components/SearchList';

class BooksApp extends React.Component {
  state = {
    booksList: [],
    searchBooksList: [],
    query: ''
  }

  // This method is invoked every time the user
  // change the shelf of a book.
  updateReadingStatus = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {this.getAllBooks()})
  }

  getAllBooks = () => {
    BooksAPI.getAll()
      .then((data) => {
        this.setState(() => ({
          booksList: data
        }))
      })
  }

  onSearch = (term) => {
    if(term === '') {
      this.setState({ searchBooksList: [], query: '' })
      return
    }
    BooksAPI.search(term)
      .then((data) => {
        this.setState(() => {
          if (data.length > 0) {
            // Here is a check to see if the book in search results
            // is already in one the shelfs to keep the book.shelf
            // on the two pages.
            data = data.map((book) => {
              let current = this.state.booksList.find((b) => b.id === book.id)
              if ( current !== undefined ) {
                book.shelf = current.shelf
                return book
              }
              return book
            })
          }
          return { 
            searchBooksList: data,
            query: term
          } 
        })
      })
  }

  // This method is invoked when user clicked on the
  // back button
  clearQuery = () => {
    this.onSearch('')
  }

  componentDidMount = () => {
    this.getAllBooks()
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks booksList={this.state.booksList}  onUpdateReadingStatus={(book, shelf) => this.updateReadingStatus(book, shelf)} />
        )} />

        <Route path='/search' render={() => (
          <SearchList 
            searchBooksList={this.state.searchBooksList}
            onSearch={(term)=> this.onSearch(term)}
            onUpdateReadingStatus={(book, shelf) => this.updateReadingStatus(book, shelf)}
            onClearQuery={this.clearQuery}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
