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
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  changeBookShelfForBook(book, newShelf) {
    // Update local state so changes are instantaneous
    const oldShelf = book.shelf
    // remove book from oldShelf's piece of state
    let newState = {}
    if (book.shelf) {
      // only remove from old shelf if it actually was in a shelf to begin with
      newState[oldShelf] = this.state[oldShelf].filter(b => b.id !== book.id)
    }
    // add book to the newShelf
    if (newShelf !== 'none') {
      newState[newShelf] = this.state[newShelf]
      newState[newShelf].push(book)
    }
    // actually update state
    this.setState(newState)

    // update server so we are in sync (if the user reloads for ex)
    BooksAPI.update(book, newShelf).then(response => {
      // book updated successfully, now update state
      // reload all books
      this.updateBooksState()
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
      this.setState(newState)
    })
  }

  componentDidMount() {
    this.updateBooksState()
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
          <SearchScreen moveBookAction={this.changeBookShelfForBook.bind(this)} />
        )} />
      </div>
    )
  }
}

export default BooksApp
