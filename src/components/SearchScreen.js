import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookItem from './BookItem'
import PropTypes from 'prop-types'

class SearchScreen extends React.Component {
  static propTypes = {
    moveBookAction: PropTypes.func.isRequired,
    booksInShelf: PropTypes.array.isRequired,
  }

  state = {
    books: [],
    query: "",
    booksInShelf: {},
  }

  addBooksToShelves(books) {
    let newBooks = books.map((book, index) => {
      if (this.state.booksInShelf[book.id]) {
        // this book search result is in a shelf
        books[index].shelf = this.state.booksInShelf[book.id]
      }
      return book
    })
    this.setState({books: newBooks})
  }

  componentDidMount() {
    let booksInShelf = {}
    this.props.booksInShelf.forEach(book => {
      booksInShelf[book.id] = book.shelf
    })
    this.setState({booksInShelf})
  }

  updateQuery = query => {
    this.setState({ query })
    // Update book results based on query
    BooksAPI.search(query).then(books => {
      // add shelves to book results. For some reason the search api endpoint
      // doesn't have the shelf property
      this.addBooksToShelves(books)
    })
  }

  moveBookAction(book, shelf) {
    // bubble up state change so we update the server and the app state
    this.props.moveBookAction(book, shelf)
    let newBooks = this.state.books.map(b => {
      if(b.id === book.id) {
        b.shelf = shelf
      }
      return b
    })
    this.setState({books: newBooks})
  }

  render() {
    console.log(this.state.books)
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            value={this.state.query}
            onChange={(e) => this.updateQuery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {/* Show appropriate books based on query */}
          {this.state.query && this.state.books.length && this.state.books.map(book => (
            <BookItem key={book.id} book={book} moveBookAction={this.moveBookAction.bind(this)} />
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchScreen