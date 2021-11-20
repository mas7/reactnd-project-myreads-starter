import React from "react";
import PropTypes from "prop-types";

class BookChanger extends React.Component {
  handleChange = (e, book) => {
    this.props.onShelfChange(e, book);
  };

  render() {
    const { book } = this.props;
    return (
      <div className="book-shelf-changer">
        <select
          onChange={(e) => this.handleChange(e, book)}
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
}

BookChanger.propTypes = {
  book: PropTypes.object.isRequired,
  // onShelfChange: PropTypes.func.isRequired,
};

export default BookChanger;
