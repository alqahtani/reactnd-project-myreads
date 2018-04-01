import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

import './App.css'

import ListBooks from './components/ListBooks';
import SearchList from './components/SearchList';

class BooksApp extends React.Component {
  state = {
    booksList: []
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
          <SearchList />
        )} />

      </div>
    )
  }
}

export default BooksApp
