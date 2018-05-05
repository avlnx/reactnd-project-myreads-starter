// Contrib
import React from 'react'
import {Route} from 'react-router-dom'
// Custom (from fork)
import * as BooksAPI from './BooksAPI'
import './App.css'
// Custom
import SearchScreen from './components/SearchScreen'
import IndexScreen from './components/IndexScreen'

class BooksApp extends React.Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  changeBookShelfForBook(book, newShelf) {
    // Update local state so changes are instantaneous then
    const oldShelf = book.shelf
    // remove book from oldShelf's piece of state
    let newState = {}
    newState[oldShelf] = this.state[oldShelf].filter(b => b.id !== book.id)
    // add book to the newShelf
    newState[newShelf] = this.state[newShelf]
    newState[newShelf].push(book)
    // actually update state
    this.setState(newState)

    // update server so we are in sync (if the user reloads for ex)
    BooksAPI.update(book, newShelf).then(response => {
      // book updated successfully, now update state
      console.log(response)
    })
  }

  updateBooksState() {
    // Populate books state piece
    BooksAPI.getAll().then(books => {
      // Populate proper shelves by filtering the books array
      const shelves = ['currentlyReading', 'wantToRead', 'read']
      let newState = {}
      shelves.forEach(shelf => {
        newState[shelf] = books.filter(book => book.shelf === shelf)
      })
      // Adds all books to `books` piece of state
      newState['books'] = books
      this.setState(newState)
    })
  }

  componentDidMount() {
    this.updateBooksState();
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <IndexScreen
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read}
            moveBookAction={this.changeBookShelfForBook.bind(this)} />
        )}/>
        <Route path='/search' render={() => (
          <SearchScreen />
        )} />
      </div>
    )
  }
}

export default BooksApp
