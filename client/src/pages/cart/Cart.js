import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import CartImg from "../../icons/Empty-amico.svg";
import PaypalButton from "./PaypalButton";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeBook = (id) => {
    if (window.confirm("Do you want to delete this book ?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <div className="cart-empty">
        <center>
          <img src={CartImg} alt="" width="450" />
        </center>
        <h2
          style={{
            textAlign: "center",
            fontSize: "50px",
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          <i className="fas fa-frown"></i> Your Cart is Empty
        </h2>
        <p style={{ textAlign: "center", fontSize: "30px", fontWeight: "700" }}>
          Looks like You have not added anything to your cart. Go ahead &
          explore our Library.
        </p>
      </div>
    );

  return (
    <div>
      {cart.map((book) => (
        <div className="detail cart" key={book._id}>
          <img src={book.images.url} alt="" />

          <div className="box-detail">
            <h5>{book.title}</h5>
            <h3>{book.price * book.quantity} MAD</h3>
            <h3>Summary of the Book :</h3>
            <p>{book.description}</p>
            <h3>About the Author {book.author} :</h3>
            <p>{book.content}</p>
            <div className="amount">
              <button onClick={() => decrement(book._id)}>
                <i className="fa fa-minus"></i>
              </button>
              <span>{book.quantity}</span>
              <button onClick={() => increment(book._id)}>
                <i className="fa fa-plus"></i>
              </button>
            </div>
            <div className="delete" onClick={() => removeBook(book._id)}>
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: {total} MAD</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
}

export default Cart;
