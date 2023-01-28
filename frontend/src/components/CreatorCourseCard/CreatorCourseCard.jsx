import React from "react";

const CreatorCourseCard = () => {
  return (
    <>
      <div className="w-25 mb-5 col-md-6">
        <div className="card-item border">
          <img
            src="https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80"
            className="card-img-top img-fluid card-image"
            alt="Course"
          />
          <div className="card-body">
            <h5 className="card-title">React - Complete Guide</h5>

            <p className="card-text fs-5">
              <i className="bi bi-person"></i> Mark
            </p>

            <p className="bg-light border rounded text-center mt-4 fw-bold fs-5">
              22$
            </p>
          </div>
          <div className="buttons-wrapper d-flex justify-content-around w-50 text-center mx-auto mb-3">
            <button className="btn btn-dark text-white">Edit</button>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatorCourseCard;
