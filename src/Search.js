import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { books: [], query: "" };
    this.shelfBooks = props.shelfBooks;
    this.onShelfChange = props.onShelfChange;
  }

  handleOnChange = (e) => {
    const { value } = e.target;
    if (value.length > 0) {
      this.setState((prevState) => ({ query: value }));
      this.getBooks();
    } else {
      this.setState((prevState) => ({ query: "", books: [] }));
    }
  };

  getBooks = () => {
    BooksAPI.search(this.state.query).then((resBooks) => {
      if (resBooks !== undefined && resBooks.length > 0) {
        resBooks.forEach((rbook, index) => {
          this.shelfBooks.forEach((sb) => {
            if (sb.id === rbook.id) {
              resBooks[index].shelf = sb.shelf;
            }
          });
        });
        this.setState((prevState) => ({ books: resBooks }));
      }
    });
  };

  handleOnShelfChange = (e, book) => {
    const { value } = e.target;
    this.state.books.forEach((rbook) => {
      if (rbook.id === book.id) {
        rbook.shelf = value;
      }
    });
    this.onShelfChange(e, book);
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.query}
              onChange={(event) => this.handleOnChange(event)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books &&
              this.state.books.length > 0 &&
              this.state.books.map((myBook) => (
                <Book
                  key={myBook.id}
                  book={myBook}
                  onShelfChange={this.handleOnShelfChange}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shelfBooks: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
};

export default Search;
