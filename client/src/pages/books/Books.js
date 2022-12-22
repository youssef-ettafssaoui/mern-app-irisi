import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import BookItem from "../utils/bookItem/BookItem";
import Loading from "../utils/loading/Loading";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import axios from "axios";
function Books() {
  const state = useContext(GlobalState);
  const [books, setBooks] = state.booksAPI.books;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.booksAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    books.forEach((book) => {
      if (book._id === id) book.checked = !book.checked;
    });
    setBooks([...books]);
  };

  const deleteBook = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = axios.post(
        "/api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteBook = axios.delete(`/api/books/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteBook;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    books.forEach((book) => {
      book.checked = !isCheck;
    });
    setBooks([...books]);
    setIsCheck(!isCheck);
  };

  const deledarkbluel = () => {
    books.forEach((book) => {
      if (book.checked) deleteBook(book._id, book.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <Filters />

      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deledarkbluel}>Delete ALL</button>
        </div>
      )}

      <div className="books">
        {books.map((book) => {
          return (
            <BookItem
              key={book._id}
              book={book}
              isAdmin={isAdmin}
              deleteBook={deleteBook}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>

      <LoadMore />
      {books.length === 0 && <Loading />}
    </>
  );
}

export default Books;
