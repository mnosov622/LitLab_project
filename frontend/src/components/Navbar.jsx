import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useState } from "react";
import "./Navbar.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logInAsLearner } from "../store/actions";
import { loggedIn } from "../store/reducers/login";
import { logInAsCreator } from "../store/actions/index";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
import SearchBar from "../pages/Search/SearchBar";
import dashboard from "../assets/dashboard.png";
import myLearning from "../assets/my-learning.png";
import allCourses from "../assets/all-courses.png";

const Navbar = () => {
  const [name, setName] = useState("");
  const [numberOfItems, setNumberOfItems] = useState(0);
  const navigate = useNavigate();
  const loggedInAsLearner = useSelector((state) => state.loggedInAsLearner);
  const loginAsCreator = useSelector((state) => state.creatorLogin);
  const loginAsAdmin = useSelector((state) => state.adminLogin);
  const courses = useSelector((state) => state.coursesReducer);

  const amount = useSelector((state) => state.increaseItemsAmount);
  console.log("amount", amount);

  const shoppingCart = JSON.parse(localStorage.getItem("shopping_cart"));
  useEffect(() => {
    const numberOfItems = shoppingCart ? shoppingCart.length : 0;
    setNumberOfItems(numberOfItems);
    console.log("useffect run");
    console.log("amount is", amount);
  }, [numberOfItems, shoppingCart, amount]);

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      const decoded = jwtDecode(token);
      console.log("decoded name", decoded.name);
      setName(decoded.name);
    }
  }, [token]);

  return (
    <nav
      className={
        loggedInAsLearner
          ? "navbar navbar-expand-md "
          : "navbar navbar-expand-md fixed-top"
      }
    >
      <div className="row container-fluid">
        <div className="row">
          <div className="col ">
            <Link to="/" className="">
              <img className="logo" src={logo} alt="logo" />
            </Link>
          </div>
          {!loginAsCreator && (
            <div className="col-md-2 all-courses fs-5 d-flex justify-content-between align-items-center">
              <Link to="/all-courses">
                Explore All Courses &nbsp;
                <img src={allCourses} alt="" width={"12%"} />
              </Link>
            </div>
          )}

          {loggedInAsLearner && <SearchBar />}

          {loggedInAsLearner ? (
            <div className="col-md-6 d-flex align-items-baseline justify-content-around">
              <p className="fs-5 text-black">
                Welcome back, <span className="text-primary">{name}</span>
              </p>
              <Link to="/" className="dashboard-item fs-5">
                My courses
              </Link>
              <Link to="/cart" className="dashboard-item cart fs-5">
                My Cart
                <span className="amount">{numberOfItems}</span>
              </Link>

              <div className="offset-1 col-md-2 mt-4">
                <button
                  className="justify-content-end btn btn-dark"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : loginAsCreator ? (
            <div className="col-md-10 d-flex align-items-baseline justify-content-between">
              <p className="fs-5 text-black">
                Welcome back, <span className="text-primary">{name}</span>
              </p>
              <Link to="/" className="dashboard-item fs-5">
                My courses
              </Link>
              <Link to="/upload" className="dashboard-item fs-5">
                Upload a course
              </Link>

              <Link to="/analytics" className="dashboard-item fs-5">
                Analytics
              </Link>
              <Link to="/profile" className="dashboard-item fs-5">
                My Profile
              </Link>

              <div className="offset-1 col-md-2 mt-4">
                <button
                  className="justify-content-end btn btn-dark"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : loginAsAdmin ? (
            <>
              <div className="col-md-8 d-flex align-items-baseline justify-content-between">
                <p className="offset-2 fs-5 text-black">
                  Welcome back, <span className="text-primary">{name}</span>
                </p>
                <div className="col-md-4 mt-4 fs-5 d-flex align-items-center ">
                  <Link
                    to="/"
                    className="d-flex align-items-center justify-content-center"
                  >
                    <span className="me-2">Dashboard</span>
                    <img
                      src={dashboard}
                      alt=""
                      srcset=""
                      width={"5%"}
                      height={"55%"}
                      style={{ alignSelf: "center" }}
                    />
                  </Link>
                </div>

                <div className="offset-1 col-md-2 mt-4">
                  <button
                    className="justify-content-end btn btn-dark"
                    onClick={logOut}
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-md-7 text-end mt-4">
                <Link to="login" className="">
                  <button className="justify-content-end btn btn-secondary">
                    Log in
                  </button>
                </Link>
              </div>
              <div className="col text-center mt-4">
                <Link to="signup" className="">
                  <button className="btn btn-primary">Sign up</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
