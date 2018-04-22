import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Books'
import { PropTypes } from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'

class Search extends Component {
  state = {
    Books: [ ],
    query: ''
  }

  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
    theBooks: PropTypes.array.isRequired
  }

  updater = ( event ) => {
    var value = event.target.value
    this.setState(() => {
      return { query: value }
    })
    this.search( value )
  }

  updateBookShelf = ( books ) => {
    let bookCollection = this.props.theBooks
      for ( let book of books ) {
        book.shelf = 'none'
      }
        for ( let book of books ) {
          for ( let b of bookCollection ) {
            if ( b.id === book.id ) {
              book.shelf = b.shelf
            }
          }
        }
    return books
  }

  searchFor = ( val ) => {
    if ( val.length !== 0 ) {
      BooksAPI.search( val, 10 )
      .then(( books ) => {
        if ( books.length > 0 ) {
          books = books.filter(( book ) => ( book.imageLinks ))
          books = this.updateBookShelf( books )
          this.setState(() => {
            return { Books: books }
          })
        }
      })
    } else {
      this.setState({ Books: [ ], query: ''})
    }
  }

  addBook = ( book, shelf ) => {
    this.props.onUpdate( book, shelf )
  }

  render() {
    return (
      <div className = "search-books">
        <div className = "search-books-bar">
          <Link to = '/' className = "close-search">Close</Link>
              <div className = "search-books-input-wrapper">
                <input type = "text" placeholder = "Search by title or author" value = { this.state.query }onUpdate = {
                  this.updater }/>
              </div>
        </div>
        <div className = "search-books-results">
          <ol className = "books-grid">
            { this.state.query.length > 0 && this.state.Books.map(( book, index ) => ( <Book book = { book } key = { index } onUpdate = {( shelf ) => {

            }}/>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search