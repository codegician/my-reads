import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import BookList from './components/BookList'
import Search from './components/Search'
import './App.css';

class BooksApp extends React.Component {
  state = {
 
    books: [],
  }

  componentDidMount(){
    this.pullBooks()
  }
  pullBooks = () => {
    BooksAPI.getAll().then(( books ) => this.setState({ books })) 
  }

  updateShelf = ( book, shelf ) => {
    BooksAPI.update( book, shelf ).then(() => { this.pullBooks()
    })
  }
  

render() {
  return (
      <div className = "app">
              <Route exact path ="/search" 
                render = { ({ history }) => (
                  <Search 
                    theBooks = { this.state.books } updateShelf = {( book, shelf ) => {
                      this.updateShelf( book, shelf )
                        history.push('/')
                      }}
                  />
                )}
              />

            <Route exact path = '/' render = {() => (
                <BookList 
                  books = { this.state.books }
                  updateShelf = {( book, shelf ) => {
                    this.updateShelf( book, shelf )
                  }}
                />
              )}
            />
      </div>
    );
  }
}

export default BooksApp;
