import React from "react";

import Login from "./Login";
import Register from "./Rg";

import "./login-and-register.scss";

const LoginAndRegisterPage = () => (
  <div className="login-and-register">
    <Login />
    <Register />
  </div>
);

export default LoginAndRegisterPage;
