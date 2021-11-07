import React, { Component } from "react";
import { Link } from "react-router-dom";
import Shelf from "./components/Shelf";

export class SearchPage extends Component {
  render() {
    const { handleSearch, searchTerm, books, handleBookShelf } = this.props;
    console.log(searchTerm);
    let searchResult = books.filter((b) => {
      return (
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.authors[0].toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    const currentlyReading = searchResult.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = searchResult.filter(
      (book) => book.shelf === "wantToRead"
    );
    const read = searchResult.filter((book) => book.shelf === "read");
    
   
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search by title or author"
            />
          
          </div>
        </div>
        <div className="search-books-results">
          {searchTerm &&
            (searchResult.length === 0 ? (
              <div>No results</div>
            ) : (
              <ol className="books-grid">
                <li>
                  <Shelf
                    key={currentlyReading.id}
                    handleBookShelf={handleBookShelf}
                    title="Currently Reading"
                    books={currentlyReading}
                  />
                </li>
                <li>
                  <Shelf
                    key={wantToRead.id}
                    handleBookShelf={handleBookShelf}
                    title="Want To Read"
                    books={wantToRead}
                  />
                </li>
                <li>
                  <Shelf
                    key={read.id}
                    handleBookShelf={handleBookShelf}
                    title="Read"
                    books={read}
                  />
                </li>
              </ol>
            ))}
        </div>
      </div>
    );
  }
}

export default SearchPage;
