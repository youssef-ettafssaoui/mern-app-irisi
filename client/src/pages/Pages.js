import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalState } from "../GlobalState";
import NotFound from "./utils/not_found/NotFound";
import CreateBook from "./createBook/CreateBook";
import DetailBook from "./detailBook/DetailBook";
import Cart from "./cart/Cart";
import Books from "./books/Books";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Categories from "./categories/Categories";
import LoginAndRegisterPage from "./auth/LoginAndRegisterPage";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/" exact element={<Books />} />
      <Route path="/detail/:id" exact element={<DetailBook />} />

      <Route
        path="/login-and-register"
        exact
        element={isLogged ? <NotFound /> : <LoginAndRegisterPage />}
      />

      <Route
        path="/category"
        exact
        element={isAdmin ? <Categories /> : <NotFound />}
      />
      <Route
        path="/create_book"
        exact
        element={isAdmin ? <CreateBook /> : <NotFound />}
      />
      <Route
        path="/edit_book/:id"
        exact
        element={isAdmin ? <CreateBook /> : <NotFound />}
      />

      <Route
        path="/history"
        exact
        element={isLogged ? <OrderHistory /> : <NotFound />}
      />
      <Route
        path="/history/:id"
        exact
        element={isLogged ? <OrderDetails /> : <NotFound />}
      />

      <Route path="/cart" exact element={<Cart />} />

      <Route path="*" exact element={<NotFound />} />
    </Routes>
  );
}

export default Pages;
