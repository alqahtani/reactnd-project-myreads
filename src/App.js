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
      this.setState({ searchBooksList: [] })
      return
    }
    BooksAPI.search(term)
      .then((data) => {
        this.setState({ 
          searchBooksList: data,
          query: term 
        })
      })
  }

  componentDidMount() {
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
            booksList={this.state.booksList}
            searchBooksList={this.state.searchBooksList}
            onSearch={(term)=> this.onSearch(term)}
            onUpdateReadingStatus={(book, shelf) => this.updateReadingStatus(book, shelf)}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp
