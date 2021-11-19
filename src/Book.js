import React from "react";
import PropTypes from "prop-types";
import BookChanger from "./BookChanger";
import BookAuthor from "./BookAuthor";

class Book extends React.Component {
  // state = {
  //   myBook: {},
  //   onShelfChange:
  // };

  // constructor(props) {
  //   super(props);
  //   this.state.myBook = props.book;
  // }

  render() {
    const { book, onShelfChange } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${book.imageLinks &&
                  book.imageLinks.smallThumbnail})`,
              }}
            />
            <BookChanger book={book} onShelfChange={onShelfChange} />
          </div>
          <div className="book-title">{book.title}</div>
          {book.authors &&
            book.authors.map((author, index) => (
              <BookAuthor key={author + index + book.id} author={author} />
            ))}
        </div>
      </li>
    );
  }
}

Book.propTypes = {
  // book: PropTypes.object.isRequired,
};

export default Book;
