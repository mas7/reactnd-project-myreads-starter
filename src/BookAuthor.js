import React from "react";
import PropTypes from "prop-types";

function BookAuthor(props) {
  const { author } = props;
  return <div className="book-authors">{author}</div>;
}

BookAuthor.propTypes = {
  author: PropTypes.string.isRequired,
};

export default BookAuthor;
