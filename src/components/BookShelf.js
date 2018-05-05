import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'

class BookShelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    moveBookAction: PropTypes.func.isRequired,
  }

  render() {
    const {books, title, moveBookAction} = this.props;
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <BookItem key={book.id} book={book} moveBookAction={moveBookAction} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf