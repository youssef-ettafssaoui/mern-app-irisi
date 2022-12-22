import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "../../icons/menu.svg";
import Close from "../../icons/close.svg";
import Cart from "../../icons/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_book">
            <i className="fa fa-plus-square"></i> Create Book
          </Link>
        </li>
        <li>
          <Link to="/category">
            <i className="fa fa-list-alt"></i> Categories
          </Link>
        </li>
      </>
    );
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">
            <i className="fa fa-history"></i> History
          </Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            <i className="fa fa-sign-out"></i> Logout
          </Link>
        </li>
      </>
    );
  };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h2>
          <Link to="/">
            <i className="fa fa-home"></i> {isAdmin ? "Admin Board" : "MIBY"}
          </Link>
        </h2>
      </div>

      <ul style={styleMenu}>
        <li>
          <Link to="/">
            <i className="fa fa-book"></i> {isAdmin ? "Books" : "Shop"}
          </Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">
              <i className="fa fa-sign-in"></i> Login & Register
            </Link>
          </li>
        )}

        <li onClick={() => setMenu(!menu)}>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
