// Contrib
import React from 'react'
import {Route} from 'react-router-dom'
// Custom
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchScreen from './components/SearchScreen';
import IndexScreen from './components/IndexScreen';

class BooksApp extends React.Component {
  state = {}

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <IndexScreen />
        )}/>
        <Route path='/search' render={() => (
          <SearchScreen />
        )} />
      </div>
    )
  }
}

export default BooksApp
