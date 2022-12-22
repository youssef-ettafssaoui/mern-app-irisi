import React, { useState } from "react";
import axios from "axios";
import "./register.scss";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="registration">
          <h1>
            <i class="fa fa-edit me-2"></i> Register.
          </h1>
          <p>
            Pariatur non et deserunt sit deserunt excepteur. Nulla anim id
            tempor sunt velit incididunt eiusmod anim nostrud elit Lorem fugiat
            magna.
          </p>
          <form onSubmit={registerSubmit}>
            <input
              type="text"
              name="name"
              required
              placeholder="Name"
              value={user.name}
              onChange={onChangeInput}
            />

            <input
              type="email"
              name="email"
              required
              placeholder="Email"
              value={user.email}
              onChange={onChangeInput}
            />

            <input
              type="password"
              name="password"
              required
              autoComplete="on"
              placeholder="Password"
              value={user.password}
              onChange={onChangeInput}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
