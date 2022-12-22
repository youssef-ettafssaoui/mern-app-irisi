import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";

function BtnRender({ book, deleteBook }) {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link
            id="btn_buy"
            to="#!"
            onClick={() => deleteBook(book._id, book.images.public_id)}
          >
            <i className="fas fa-trash"></i> Delete
          </Link>
          <Link id="btn_view" to={`/edit_book/${book._id}`}>
            <i className="fas fa-pencil"></i> Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!" onClick={() => addCart(book)}>
            <i className="fas fa-cart-plus"></i> Buy
          </Link>
          <Link id="btn_view" to={`/detail/${book._id}`}>
            <i className="fas fa-eye"></i> View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
