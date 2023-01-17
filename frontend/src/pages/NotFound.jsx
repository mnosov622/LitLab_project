import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="row mt-5">
      <div className="col-md-12 text-center fs-1 mt-5">
        <p>Sorry, we couldn't find that page</p>
        <Link to="/">
          <button className="btn btn-primary btn-lg d-flex mx-auto align-items-center">
            <span className="ml-2">Go to Home page</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
