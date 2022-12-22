import React from "react";
import BtnRender from "./BtnRender";

function BookItem({ book, isAdmin, deleteBook, handleCheck }) {
  return (
    <div className="book_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={book.checked}
          onChange={() => handleCheck(book._id)}
        />
      )}
      <img src={book.images.url} alt="" />

      <div className="book_box">
        <h2 title={book.title}>
          {book.title} <small>{book.author}</small>
        </h2>
        <span>${book.price}</span>
        <p>{book.description?.substring(0, 50)}...</p>
      </div>

      <BtnRender book={book} deleteBook={deleteBook} />
    </div>
  );
}

export default BookItem;
