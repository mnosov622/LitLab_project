import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import logo from "../assets/logo.png";
import courses from "../fakeData/courses.json";
import { getOptions } from "../utils/getOptions";
import { useState } from "react";
import "./Navbar.style.scss";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [showList, setShowList] = useState(true);

  const displayOptions = () => {
    const options = getOptions(search, courses);
    setData(options);
  };
  const searchForCourses = () => {
    displayOptions();
  };

  return (
    <nav className="navbar navbar-expand-md fixed-top">
      <div className="row container-fluid ">
        <div className=" row">
          <ul className="navbar-nav d-flex align-items-center">
            <div className="col">
              <Link to="/" className="">
                <img className="logo" src={logo} alt="logo" />
              </Link>
            </div>
            <div className="col-2">
              <Link to="all-courses">Explore All Courses</Link>
            </div>
            <div className="offset-1 col-4">
              <form action="">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search for your favourite courses"
                    aria-label="Search for your favourite courses"
                    onKeyUp={searchForCourses}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowList(true)}
                    onBlur={() => setShowList(false)}
                  ></input>
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
                {showList && (
                  <ul className="options">
                    {data &&
                      data.map((item) => (
                        <Link to="/">
                          <li key={item.id} className="item">
                            {item.name}
                            <p className="text-muted mt-1 mb-0">
                              By {item.instructor}
                            </p>
                          </li>
                        </Link>
                      ))}
                  </ul>
                )}
              </form>
            </div>
            <div className="col offset-2">
              <Link to="login" className="">
                <button className="justify-content-end btn btn-secondary">
                  Log in
                </button>
              </Link>
            </div>
            <div className="col">
              <Link to="signup" className="">
                <button className="btn btn-primary">Sign up</button>
              </Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
