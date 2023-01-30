import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import courses from "../fakeData/courses.json";
import { getOptions } from "../utils/getOptions";
import { useState } from "react";
import "./Navbar.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logInAsLearner } from "../store/actions";
import { loggedIn } from "../store/reducers/login";
import { logInAsCreator } from "../store/actions/index";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [showList, setShowList] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInAsLearner = useSelector((state) => state.loggedInAsLearner);
  const loginAsCreator = useSelector((state) => state.creatorLogin);
  const courses = useSelector((state) => state.coursesReducer);
  const amountIfItems = useSelector((state) => state.increaseItemsAmount);

  console.log(courses);

  const displayOptions = () => {
    const options = getOptions(search, courses);
    setData(options);
  };
  const searchForCourses = () => {
    displayOptions();
  };

  const goToCourse = (id) => {
    window.location.href = `/course/${id}`;
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
    navigate("/");
  };

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
            <div className="col-2 all-courses mt-4">
              <Link to="all-courses">Explore All Courses</Link>
            </div>
          )}

          <div className="col-md-3">
            <form action="">
              <div className="input-group search">
                <input
                  type="text"
                  className="form-control w-100 mt-4"
                  placeholder="Search for your favourite courses"
                  aria-label="Search for your favourite courses"
                  onKeyUp={searchForCourses}
                  onChange={(e) => setSearch(e.target.value)}
                  onFocus={() => setShowList(true)}
                  //To fix search remove this line
                  onBlur={() => setShowList(false)}
                ></input>
                {/* <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div> */}
              </div>
              {showList && (
                <ul className="options">
                  {data &&
                    data.map((item) => (
                      <div className="">
                        <Link
                          to={`/course/${item.id}`}
                          key={item.id}
                          // onClick={setShowList(false)}
                        >
                          <li className="item">
                            {item.name}
                            <p className="text-muted mt-1 mb-0">
                              By {item.instructor}
                            </p>
                          </li>
                        </Link>
                      </div>
                    ))}
                </ul>
              )}
            </form>
          </div>
          {loggedInAsLearner ? (
            <div className="col-md-6 d-flex align-items-baseline justify-content-between">
              <Link to="/" className="dashboard-item fs-5">
                My courses
              </Link>
              <Link to="/cart" className="dashboard-item cart fs-5">
                My Cart
                <span className="amount">{amountIfItems}</span>
              </Link>

              <Link to="/analytics" className="dashboard-item fs-5">
                Analytics
              </Link>

              <div className="offset-1 col-md-2 mt-4">
                <button
                  className="justify-content-end btn btn-primary"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : loginAsCreator ? (
            <div className="col-md-6 d-flex align-items-baseline justify-content-between">
              <Link to="/" className="dashboard-item fs-5">
                My courses
              </Link>
              <Link to="/upload" className="dashboard-item fs-5">
                Upload a course
              </Link>

              <Link to="/analytics" className="dashboard-item fs-5">
                Analytics
              </Link>

              <div className="offset-1 col-md-2 mt-4">
                <button
                  className="justify-content-end btn btn-primary"
                  onClick={logOut}
                >
                  Log out
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="col text-end mt-4">
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
