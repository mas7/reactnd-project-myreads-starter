import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import AppTitle from "./AppTitle";
import BookShelf from "./BookShelf";
import Search from "./Search";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    allBooks: [],
  };

  componentDidMount() {
    this.getBooksData();
  }

  async getBooksData() {
    const books = await BooksAPI.getAll();
    this.setState({ allBooks: books });
  }

  onShelfChange = (e, book) => {
    const { value } = e.target;
    BooksAPI.update(book, value).then((res) => {
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
