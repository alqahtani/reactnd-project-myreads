import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as BooksAPI from '../BooksAPI'

class Book extends Component {
  static PropTypes = {
    book: PropTypes.object.isRequired,
    onUpdateReadingStatus: PropTypes.func.isRequired
  }

  state = {
    shelf: "none"
  }

  componentDidMount() {
    if ( this.props.book.shelf === undefined ) {
      BooksAPI.get(this.props.book.id)
        .then((b)=> {
          if(b.shelf !== "none") {
            this.setState({ shelf: b.shelf })
          }
        })
    } else {
      this.setState({ shelf: this.props.book.shelf })
    }
  }

  componentDidUpdate() {
    BooksAPI.get(this.props.book.id)
      .then((b)=> {
        this.setState({ shelf: b.shelf })
      })
  }

  render() {
    const { book, onUpdateReadingStatus } = this.props

    return (
      <div className="book">
        <div className="book-top">
          { book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>}
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={(e) => onUpdateReadingStatus(book, e.target.value)}>
              <option value="#" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        { book.authors &&  <div className="book-authors">{book.authors[0]}</div>}
      </div>
    )
  }
}

export default Book