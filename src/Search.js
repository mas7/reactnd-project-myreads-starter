import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Search extends React.Component {
  state = {
    books: [],
    query: "",
  };

  handleOnChange = (e) => {
    e.persist();
    this.setState((prevState) => ({
      query: e.target.value,
    }));
    this.getBooks();
  };

  getBooks = () => {
    BooksAPI.search(this.state.query).then((resBooks) => {
      if (resBooks !== undefined) {
        this.setState((prevState) => ({
          books: resBooks,
        }));
      }
    });
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
                  onShelfChange={this.props.onShelfChange}
                />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
