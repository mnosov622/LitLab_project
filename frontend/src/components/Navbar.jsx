import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import { useState } from "react";
import "./Navbar.style.scss";
import { useDispatch, useSelector, useStore } from "react-redux";
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

  const [isNavOpen, setIsNavOpen] = useState(false);
  const [rotateIcon, setRotateIcon] = useState(false);

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setRotateIcon(!rotateIcon);
  };

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
    <>
      <nav
        className={
          loggedInAsLearner
            ? "navbar navbar-expand-md "
            : "navbar navbar-expand-md fixed-top"
        }
      >
        <div className="row container-fluid desktop-nav">
          <div className="row">
            <div className="col ">
              <Link to="/" className="">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </div>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

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

        <div className="container-fluid mobile-nav">
          <div className="d-flex align-items-center">
            <div className="col-md-2 logo-img" style={{ width: "20%" }}>
              <Link to="/" className="">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </div>
            {!loginAsCreator && (
              <div className="all-courses fs-5" style={{ width: "35%" }}>
                <Link to="/all-courses">
                  Explore All Courses &nbsp;
                  <img src={allCourses} alt="" width={"8%"} />
                </Link>
              </div>
            )}

            <div className="my-courses">
              <Link to="/" className="dashboard-item  fs-5">
                My courses
              </Link>
            </div>

            <div className="my-cart" style={{ marginLeft: "auto" }}>
              <Link to="/cart" className="dashboard-item cart fs-5">
                My Cart
                <span className="amount">{numberOfItems}</span>
              </Link>
            </div>
            <div className="logoutBtn">
              <button className="btn btn-dark" onClick={logOut}>
                Log out
              </button>
            </div>

            <div
              className={`hamburger-icon d-none ${rotateIcon ? "rotate" : ""}`}
              onClick={handleToggleNav}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#0d6efc"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </div>
            {isNavOpen && (
              <nav
                className={`${isNavOpen ? "mobile-menu show" : "mobile-menu"}`}
              >
                <ul>
                  <p className=" fs-5 text-black">
                    Welcome back, <span className="text-primary">{name}</span>
                  </p>
                  <li className="mobile-nav-items" onClick={handleToggleNav}>
                    <Link to="/">My Courses</Link>
                  </li>
                  <li className="mobile-nav-items" onClick={handleToggleNav}>
                    <Link to="/cart">My Cart</Link>
                  </li>
                  <li className="mobile-nav-items" onClick={handleToggleNav}>
                    <Link to="/all-courses">Explore All Courses</Link>
                  </li>
                  <button className="btn btn-dark" onClick={logOut}>
                    Log out
                  </button>
                </ul>
              </nav>
            )}

            <div className={isNavOpen ? "overlay show" : "overlay"}></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
