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

  componentDidMount() {
    BooksAPI.getAll()
      .then((data) => {
        this.setState(() => ({
          booksList: data
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks booksList={this.state.booksList} />
        )} />

        <Route path='/search' render={() => (
          <SearchList />
        )} />

      </div>
    )
  }
}

export default BooksApp
