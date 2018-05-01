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

  componentDidMount() {
    // Populate books state piece
    BooksAPI.getAll().then(books => {
      // Populate proper shelves
      const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
      const wantToRead = books.filter(book => book.shelf === 'wantToRead')
      const read = books.filter(book => book.shelf === 'read')
      this.setState({
        currentlyReading, wantToRead, read, books
      })
    })

  }

  render() {
    console.log(this.state.books);
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <IndexScreen
            currentlyReading={this.state.currentlyReading}
            wantToRead={this.state.wantToRead}
            read={this.state.read} />
        )}/>
        <Route path='/search' render={() => (
          <SearchScreen />
        )} />
      </div>
    )
  }
}

export default BooksApp
