import React from "react";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import AppTitle from "./AppTitle";
import BookShelf from "./BookShelf";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    update: false,
  };

  componentDidMount() {
    this.getBooksData();
  }

  getBooksData = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ allBooks: books });
    });
  };

  onShelfChange = (e, book) => {
    BooksAPI.update(book, e.target.value).then((res) => {
      console.log(res);
      this.getBooksData();
    });
  };

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="app">
                <div className="list-books">
                  <AppTitle title="My Bookshelf" />
                  <div className="list-books-content">
                    <div>
                      <BookShelf
                        shelfTitle="Currently Reading"
                        books={this.state.allBooks.filter(
                          (book) => book.shelf === "currentlyReading"
                        )}
                        onShelfChange={this.onShelfChange}
                      />
                      <BookShelf
                        shelfTitle="Want To Read"
                        books={this.state.allBooks.filter(
                          (book) => book.shelf === "wantToRead"
                        )}
                        onShelfChange={this.onShelfChange}
                      />
                      <BookShelf
                        shelfTitle="Read"
                        books={this.state.allBooks.filter(
                          (book) => book.shelf === "read"
                        )}
                        onShelfChange={this.onShelfChange}
                      />
                    </div>
                  </div>
                  <div className="open-search">
                    <Link to="/search">
                      <button>Add a book</button>
                    </Link>
                  </div>
                </div>
              </div>
            }
          />
          <Route
            exact
            path="/search"
            element={
              <Search
                shelfBooks={this.state.allBooks}
                onShelfChange={this.onShelfChange}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
