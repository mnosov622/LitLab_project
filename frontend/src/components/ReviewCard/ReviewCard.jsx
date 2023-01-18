import React from "react";

const ReviewCard = ({ image, name, review }) => {
  return (
    <>
      <div className="review mt-5 w-100">
        <img
          style={{ width: "20%" }}
          src={image}
          alt="Learner"
          className="rounded w-75"
        />
        <div className="text-dark mt-3 fs-5 text-center">
          <p className="text-center w-50 mx-auto text-primary border-bottom">
            {name}
          </p>
          <p className="w-75 mx-auto">{review}</p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
