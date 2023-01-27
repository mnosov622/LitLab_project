import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import courses from "../fakeData/courses.json";
import { getOptions } from "../utils/getOptions";
import { useState } from "react";
import "./Navbar.style.scss";
import { useDispatch, useSelector } from "react-redux";
import { logInAsLearner } from "../store/actions";
import { loggedIn } from "../store/reducers/login";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [showList, setShowList] = useState(true);
  const dispatch = useDispatch();

  const loggedInAsLearner = useSelector((state) => state.loggedInAsLearner);
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
    // window.location.href = `/course/${id}`;
  };

  const logOut = () => {
    dispatch(logInAsLearner());
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
          <div className="col-2 all-courses mt-4">
            <Link to="all-courses">Explore All Courses</Link>
          </div>
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
                      <div className="" onClick={goToCourse(item.id)}>
                        <Link to={`/course/${item.id}`} key={item.id}>
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
            <div className="col-md-6 d-flex align-items-baseline">
              <Link to="/" className="dashboard-item">
                My courses
              </Link>
              <Link to="/cart" className="dashboard-item cart">
                My Cart
                <span className="amount">{amountIfItems}</span>
              </Link>

              <Link to="/analytics" className="dashboard-item">
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
