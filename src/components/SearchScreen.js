import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookItem from './BookItem'
import PropTypes from 'prop-types'

class SearchScreen extends React.Component {
  static propTypes = {
    moveBookAction: PropTypes.func.isRequired,
  }

  state = {
    books: [],
    query: "",
    booksInShelf: {},
    searchTimeoutId: null,
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
    // Build a dictionary with id as key and shelf as the value so
    // we can quickly check if a book in search results is already
    // in a shelf
    let booksInShelf = {}
    // load current books in shelf
    BooksAPI.getAll().then((books) => {
      books.forEach(book => {
        booksInShelf[book.id] = book.shelf
      })
      this.setState({booksInShelf})
    })
  }

  componentWillUnmount() {
    // clear open setTimeout
    clearTimeout(this.state.searchTimeoutId)
    this.setState({searchTimeoutId: null})
  }

  updateQuery = query => {
    this.setState({ query })
    // We are using a search timeout structure so we don't make a bunch of useless
    // queries on every single keystroke
    // Update book results based on query
    // Check if there's a current query and cancel it if so
    if (this.state.searchTimeoutId) {
      clearTimeout(this.state.searchTimeoutId)
      this.setState({searchTimeoutId: null})
    }

    let timeoutId = setTimeout(() => { BooksAPI.search(query).then(books => {
        // add shelves to book results. For some reason the search api endpoint
        // doesn't have the shelf property
        if (Array.isArray(books)) this.addBooksToShelves(books)
        // clear timeoutId, we are done with this search
        this.setState({searchTimeoutId: null})
      })
    }, 100)
    this.setState({searchTimeoutId: timeoutId})
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
          {this.state.query && this.state.books.length !== 0 && this.state.books.map(book => (
            <BookItem key={book.id} book={book} moveBookAction={this.moveBookAction.bind(this)} />
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchScreen