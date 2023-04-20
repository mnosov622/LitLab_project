import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CourseCard.scss";

import { Badge } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import Modal from "../Modal/Modal";
import { useAlert, positions } from "react-alert";

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
  allCourses,
  shortDescription,
  pointsToLearn,
  homeImage,
}) => {
  const [imageSource, setImageSource] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [singlCourse, setSinglCourse] = useState([]);

  const alert = useAlert();

  const handleRemove = (id) => (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  useEffect(() => {
    const imageSource = courseImage?.startsWith("https")
      ? courseImage
      : `https://litlab-backend-v2.vercel.app/images/${courseImage}`;
    setImageSource(imageSource);
  }, []);

  const confirmRemoveCourse = () => {
    const shoppingCart = JSON.parse(localStorage.getItem("shopping_cart"));
    const updatedShoppingCart = shoppingCart.filter((i) => i.id !== id);
    localStorage.setItem("shopping_cart", JSON.stringify(updatedShoppingCart));
    setShowModal(false);
    window.location.reload();
  };

  const cancelRemoveCourse = () => {
    setShowModal(false);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const cartItems = JSON.parse(localStorage.getItem("shopping_cart")) || [];
    const existingItem = cartItems.find((item) => item.id === id);

    if (existingItem) {
      alert.error("Item exists in cart", {
        position: positions.BOTTOM_RIGHT,
        timeout: 2000,
      });
      return;
    }

    const newItem = {
      id: id,
      name: name,
      instructor: teacherName,
      price: price,
      courseImageURL: courseImage,
    };

    cartItems.push(newItem);
    alert.success("Item added to cart", {
      position: positions.BOTTOM_RIGHT,
      timeout: 2000, // custom timeout just for this one alert
    });

    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));

    window.location.reload();
  };
  return (
    <>
      {showModal && (
        <Modal
          title="Confirm Action"
          body={`Are you sure you want to delete course `}
          onConfirm={confirmRemoveCourse}
          onCancel={cancelRemoveCourse}
        />
      )}

      <div
        className={cardSmall ? "w-25 mb-5 col-md-6 course-card" : "w-100 mb-5 course-card"}
        style={{ position: "relative" }}
      >
        {courseCompleted && (
          <>
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
          </>
        )}

        <Link to={linkToCourseView ? `/course-view/${id}` : `/course/${id}`}>
          <div
            className={allCourses ? "card-item border position-relative hover_effect" : "border"}
            style={{ position: "relative" }}
          >
            {allCourses && (
              <div className={allCourses ? "layer description" : ""}>
                <div className="descrition">{shortDescription}</div>
                {pointsToLearn &&
                  pointsToLearn.map((point) => (
                    <div className="d-flex  points">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"
                          fill="#FFFFFF"
                        />
                      </svg>
                      <span className="layer_point m-auto" style={{ color: "white" }}>
                        {point.point}
                      </span>
                    </div>
                  ))}

                {allCourses && localStorage.getItem("token") !== null && (
                  <button
                    className={"btn btn-outline-primary btn-lg mt-3 btn-light addBtn"}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            )}

            {homeImage && (
              <img src={image} className="card-img-top img-fluid card-image" alt="Course" />
            )}

            {creatorCourseImage && !homeImage && (
              <img
                src={creatorCourseImage}
                className="card-img-top img-fluid card-image"
                alt="Course"
              />
            )}
            {!homeImage && (
              <img src={imageSource} className="card-img-top img-fluid card-image" alt="Course" />
            )}

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

              <p className="bg-light border rounded text-center mt-4 fw-bold fs-5">{price}$</p>
              {removable && (
                <div>
                  <button type="button" className="btn btn-danger" onClick={handleRemove(id)}>
                    <i class="bi bi-trash3-fill"></i>
                    &nbsp; Remove
                  </button>
                </div>
              )}
              {courseCompleted && (
                <div className="text-center bg-primary p-2 rounded">
                  <Link to={`/certificate/${id}`} className="text-center text-light">
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
