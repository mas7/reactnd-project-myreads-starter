import React from "react";
import PropTypes from "prop-types";

function BookChanger(props) {
  const { book, onShelfChange } = props;

  const handleChange = (e, book) => {
    onShelfChange(e, book);
  };

  return (
    <div className="book-shelf-changer">
      <select
        onChange={(e) => handleChange(e, book)}
        value={book.shelf ? book.shelf : "none"}
      >
        <option value="move" disabled>
          Move to...
        </option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  );
}

BookChanger.propTypes = {
  book: PropTypes.object.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default BookChanger;
