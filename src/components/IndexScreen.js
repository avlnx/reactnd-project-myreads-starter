import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class IndexScreen extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  render() {
    const {books} = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={books} title={'Currently Reading'} />
            <BookShelf books={books} title={'Want to Read'} />
            <BookShelf books={books} title={'Read'} />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default IndexScreen