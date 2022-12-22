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
            Delete
          </Link>
          <Link id="btn_view" to={`/edit_book/${book._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btn_buy" to="#!" onClick={() => addCart(book)}>
            Buy
          </Link>
          <Link id="btn_view" to={`/detail/${book._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}

export default BtnRender;
