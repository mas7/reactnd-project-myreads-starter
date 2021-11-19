import React from "react";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import AppTitle from "./AppTitle";
import BookShelf from "./BookShelf";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    this.getBooksData();
  }

  getBooksData = () => {
    this.clearShelfs();
    BooksAPI.getAll().then((books) => {
      books.map((book) => this.organizeBooks(book));
    });
  };

  clearShelfs = () => {
    this.setState({
      currentlyReading: [],
      wantToRead: [],
      read: [],
    });
  };

  organizeBooks = (book) => {
    this.setState((prevState) => ({
      [book.shelf]: [...prevState[book.shelf], book],
    }));
  };

  onShelfChange = (e, book) => {
    // if (book.shelf) {
    //   this.removeFromShelf(book);
    // }
    // const newBook = this.updateShelf(book, e.target.value);
    // this.addToShelf(newBook);
    BooksAPI.update(book, e.target.value).then(() => this.getBooksData());
  };

  // removeFromShelf = (book) => {
  //   this.setState((prevState) => ({
  //     [book.shelf]: prevState[book.shelf].filter((b) => b.id !== book.id),
  //   }));
  // };

  // updateShelf = (book, shelf) => {
  //   // Reference for cloning JS Objects => https://www.samanthaming.com/tidbits/70-3-ways-to-clone-objects/
  //   //  I choose to do (Deep Copy) to be more dynamic if in further development we want to change nested objects
  //   const newBook = JSON.parse(JSON.stringify(book));
  //   newBook.shelf = shelf;
  //   return newBook;
  // };

  // addToShelf = (book) => {
  //   this.setState((prevState) => ({
  //     [book.shelf]: [...prevState[book.shelf], book],
  //   }));
  // };

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
                        books={this.state.currentlyReading}
                        onShelfChange={this.onShelfChange}
                      />
                      <BookShelf
                        shelfTitle="Want To Read"
                        books={this.state.wantToRead}
                        onShelfChange={this.onShelfChange}
                      />
                      <BookShelf
                        shelfTitle="Read"
                        books={this.state.read}
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
            element={<Search onShelfChange={this.onShelfChange} />}
          />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default BooksApp;
