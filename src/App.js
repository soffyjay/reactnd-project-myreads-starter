import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import Header from "./components/Header";
import BookShelves from "./components/BookShelves";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchTerm: "",
   
  };

  componentDidMount() {
    BooksAPI.getAll().then((data) =>
      this.setState(() => ({
        books: data,
      })),
    );
   
  }
   //this function searches for book
  // componentDidMount() {
  //   let isActive = true;
  //   const query = this.state.searchTerm;
  //   if (query) {
  //     BooksAPI.search(query).then((data) => {
  //       if (data.error) {
  //         this.setState(() => ({
  //           searchTerm: "",
  //         }));
  //       } else {
  //        f (isActive) {
  //           this.setState(() => ({
  //             searchTerm: data,
  //           }));
  //         }
  //       }
  //     });
  //   }
  //   return
  // }
  handleSearchRequest(query) {
    BooksAPI.search(query).then(books => books ? this.setState({ books }) : [])
    .catch(() => alert('Something went wrong! Please try again!'));
    this.setState({ searchTerm:query });
}
  // handleSearchRequest = () => {
  //   let query = this.state.searchTerm;
  //   if (query) {
  //     BooksAPI.search(query).then((data) => {
  //       return this.setState(() => ({
  //         queryBooks: data,
  //       }));
  //     });
  //   }
  //   console.log(this.state.queryBooks)
  // };

  //this function updates the shelf of a book
  handleBookShelf = (book, newShelf) => {
    const updatedBooks = this.state.books.map((b) => {
      if (b.id === book.id) {
        book.shelf = newShelf;
        return book;
      }
      return b;
    });
    this.setState(() => ({
      books: updatedBooks,
    }));
    BooksAPI.update(book, newShelf);
  };

  handleSearch = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  };
  
  clearSearch=()=>{
    this.setState({
      searchTerm:''
    });
  }
  render() {
   
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <Header />
              <div className="list-books-content">
                <BookShelves
                  handleBookShelf={this.handleBookShelf}
                  books={this.state.books}
                  clearSearch={this.clearSearch}
                />
              </div>
            </div>
          )}
        />
        <Route
         path= "/search"
          render={() => (
            <SearchPage
              handleSearch={this.handleSearch}
              searchTerm={this.state.searchTerm}
              books={this.state.books}
              handleBookShelf={this.handleBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
