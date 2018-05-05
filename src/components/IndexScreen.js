import React from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class IndexScreen extends React.Component {
  static propTypes = {
    currentlyReading: PropTypes.array.isRequired,
    wantToRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    moveBookAction: PropTypes.func.isRequired,
  }

  render() {
    const {currentlyReading, wantToRead, read, moveBookAction} = this.props

    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf books={currentlyReading} title={'Currently Reading'} moveBookAction={moveBookAction} />
            <BookShelf books={wantToRead} title={'Want to Read'} moveBookAction={moveBookAction} />
            <BookShelf books={read} title={'Read'} moveBookAction={moveBookAction} />
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