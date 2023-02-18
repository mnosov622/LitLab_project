import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CourseCard.scss";

import { Badge } from "react-bootstrap";
import jwtDecode from "jwt-decode";

const CourseCard = ({
  name,
  image,
  price,
  teacherName,
  id,
  cardSmall,
  courseImage,
  creatorCourseImage,
  rating,
  linkToCourseView,
  contentCreatorCard,
  courseCompleted,
  demo,
  deleteBtn,
  removable,
  courseImageURL,
}) => {
  const [imageSource, setImageSource] = useState("");

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    const shoppingCart = JSON.parse(localStorage.getItem("shopping_cart"));
    const updatedShoppingCart = shoppingCart.filter((i) => i.id !== id);
    localStorage.setItem("shopping_cart", JSON.stringify(updatedShoppingCart));

    window.location.reload();
  };

  useEffect(() => {
    const imageSource = courseImage?.startsWith("https")
      ? courseImage
      : `http://localhost:8000/images/${courseImage}`;
    setImageSource(imageSource);
  }, []);

  return (
    <>
      <div
        className={cardSmall ? "w-25 mb-5 col-md-6" : "w-100 mb-5"}
        style={{ position: "relative" }}
      >
        {courseCompleted && (
          <Badge
            variant="success"
            className="w-75"
            style={{
              fontSize: "20px",
              position: "absolute",
              top: 0,
              right: "12.5%",
              zIndex: 1,
            }}
          >
            Completed
          </Badge>
        )}

        <Link to={linkToCourseView ? `/course-view/${id}` : `/course/${id}`}>
          <div
            className="card-item border position-relative"
            style={{ position: "relative" }}
          >
            {creatorCourseImage && (
              <img
                src={creatorCourseImage}
                className="card-img-top img-fluid card-image"
                alt="Course"
              />
            )}
            <img
              src={imageSource}
              className="card-img-top img-fluid card-image"
              alt="Course"
            />

            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              {rating ? (
                <p className="d-flex align-items-end">
                  Rating:
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.825 22L8.15 14.4L2 10H9.6L12 2L14.4 10H22L15.85 14.4L18.175 22L12 17.3L5.825 22Z"
                      fill="#FFD233"
                    />
                  </svg>
                  <span>{rating}</span>
                </p>
              ) : (
                <p className="card-text fs-5">
                  <i className="bi bi-person"></i> {teacherName}
                </p>
              )}

              <p className="bg-light border rounded text-center mt-4 fw-bold fs-5">
                {price}$
              </p>
              {removable && (
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={handleRemove(id)}
                  >
                    <i class="bi bi-trash3-fill"></i>
                    &nbsp; Remove
                  </button>
                </div>
              )}
              {courseCompleted && (
                <div className="text-center bg-primary p-2 rounded">
                  <Link
                    to={`/certificate/${id}`}
                    className="text-center text-light"
                  >
                    Show Certificate
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default CourseCard;
