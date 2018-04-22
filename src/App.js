import React, { Component } from 'react'
import { Route } from react-router-dom
import * as BooksAPI from './BooksAPI'
import './App.css';

class BooksApp extends React.Component {
  state = {
 
    books: [],
  }

  componentDidMount(){
    this.fetchMyBooks()
  }
  pullBooks = () => {
    BooksAPI.getAll().then(( books ) => this.setState({ books })) 
  }

  updateShelf = ( bookId, shelf ) => {
    BooksAPI.update( bookId, shelf ).then(() => { this.pullBooks()
    })
  }
  
  // updateShelf = (shelf) => {
  //   this.setState((currentState) => ({
  //     shelf: currentState.shelf.filter((s) => {
  //         return s.id === shelf.id.concat([ book ])
  //     })
  //   }))

  
  }

render() {
  return (
      <div className = "app">
              <Route exact path ="/search" 
                render = { ({ history }) => (
                  <SearchPage 
                    myBooks = { this.state.books } updateShelf = {( bookId, shelf ) => {
                      this.updateShelf( bookId, shelf )
                        history.push('/')
                      }}
                  />
                )}
              />

            <Route exact path = '/' render = {() => (
                <BookList 
                  books = { this.state.books }
                  updateShelf = {( bookId, shelf ) => {
                    this.updateShelf( bookId, shelf )
                  }}
                />
              )}
            />
      </div>
    );
  }
}

export default BooksApp;
