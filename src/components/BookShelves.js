import React, { Component } from "react";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

export class BookShelves extends Component {
  render() {
    const { books, handleBookShelf, clearSearch } = this.props;
    const currentlyReading = books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");
    console.log(currentlyReading);

    return (
      <div>
        <Shelf
          key={currentlyReading.id}
          handleBookShelf={handleBookShelf}
          title="Currently Reading"
          books={currentlyReading}
        />
        <Shelf
          key={wantToRead.id}
          handleBookShelf={handleBookShelf}
          title="Want To Read"
          books={wantToRead}
        />
        <Shelf
          key={read.id}
          handleBookShelf={handleBookShelf}
          title="Read"
          books={read}
        />
        <div className="open-search">
          <Link onClick={clearSearch} to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BookShelves;
