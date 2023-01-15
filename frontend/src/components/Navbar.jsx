import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="row container-fluid">
        <div className="col-4">
          <Link to="/" className="">
            <img className="logo" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="col-6">
          <form action="">
            <input
              type="text"
              className="w-50 rounded "
              placeholder="Search for your favourite course..."
            />
          </form>
        </div>
        <div className="col">
          <Link to="login" className="">
            <button className="justify-content-end btn btn-light">
              Log in
            </button>
          </Link>
        </div>
        <div className="col">
          <Link to="signup" className="">
            <button className="btn btn-primary">Sign up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
