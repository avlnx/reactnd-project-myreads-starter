import React from 'react'
import PropTypes from 'prop-types'

class BookItem extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBookAction: PropTypes.func.isRequired
  }

  render() {
    const {book, moveBookAction} = this.props

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select onChange={e => moveBookAction(book, e.target.value)} value={book.shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title || 'No Title Found'}</div>
          <div className="book-authors">{book.authors[0] || 'No Authors Found'}</div>
        </div>
      </li>
    )
  }
}

export default BookItem