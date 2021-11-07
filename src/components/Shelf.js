import React from "react";
import Book from "./Book";

const Shelf = ({ books, title,handleBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((b) => (
            <li key={b.id} >
              <Book handleBookShelf={handleBookShelf} allBooks={b}/>
            </li>
          ))}
        </ol>
      </div>
      
    </div>
  );
};

export default Shelf;
