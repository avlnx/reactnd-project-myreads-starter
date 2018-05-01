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
    books: []
  }

  componentDidMount() {
    // Populate books state piece
    BooksAPI.getAll().then(books => {
      this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <IndexScreen books={this.state.books} />
        )}/>
        <Route path='/search' render={() => (
          <SearchScreen />
        )} />
      </div>
    )
  }
}

export default BooksApp
