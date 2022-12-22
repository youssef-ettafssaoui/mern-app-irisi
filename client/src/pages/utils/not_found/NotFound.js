import React from "react";
import { Link } from "react-router-dom";
import NotFoundPage from "../../../icons/NotFoundPage.svg";

function NotFound() {
  return (
    <div className="cart-empty">
      <center>
        <img src={NotFoundPage} alt="" width="450" />
        <h2
          style={{
            textAlign: "center",
            fontSize: "50px",
            color: "#555",
            textTransform: "uppercase",
          }}
        >
          404 | Page Not Found
        </h2>
        <p style={{ textAlign: "center", fontSize: "26px", fontWeight: "500" }}>
          This is a 404 error, which means you've clicked on a bad link or
          entred an invalid URL. <br /> Maybe what you are looking for can be
          found at :
        </p>
        <br />
        <Link to="/" className="homeLink">
          <i className="fas fa-undo"></i> Back Home
        </Link>
        <br /> <br />
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "700",
            color: "red",
          }}
        >
          PS : <span>MIBY links are case sensitive !</span>
        </p>
      </center>
    </div>
  );
}

export default NotFound;
