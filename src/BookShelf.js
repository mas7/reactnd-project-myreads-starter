import React from "react";
import PropTypes from "prop-types";
import Book from "./Book";

class BookShelf extends React.Component {
  render() {
    const { shelfTitle, books, onShelfChange } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <Book key={book.id} book={book} onShelfChange={onShelfChange} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

BookShelf.propTypes = { shelfTitle: PropTypes.string.isRequired };

export default BookShelf;
