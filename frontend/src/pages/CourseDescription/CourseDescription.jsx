import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import courseImage from "../../assets/courseImage.jpg";
// import starIcon from "../../assets/star.svg";
import learningImage from "../../assets/learning.png";
import "./CourseDescription.scss";
import { useParams } from "react-router-dom";
import { addToCart, buyNowItem } from "../../store/actions";
import { useState } from "react";
import { useAlert, positions } from "react-alert";
import { loggedInAsLearner } from "../../store/reducers/loginAsLearner";
import { itemsAmount } from "../../store/actions";
import { increaseItemsAmount } from "../../store/reducers/itemsAmount";
import { useEffect } from "react";
import { Oval } from "react-loader-spinner";
import jwtDecode from "jwt-decode";

const CourseDescription = () => {
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector((state) => state.coursesReducer);
  const singleCourse = courses.find((course) => course.id === Number(id));
  const cart = useSelector((state) => state.cartReducer);
  const itemToBuy = useSelector((state) => state.buyCourseReducer);
  const [cartItem, setCartItem] = useState(cart);
  const [buy, setBuy] = useState(itemToBuy);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasCourse, setHasCourse] = useState(false);
  console.log("CURRENT CART", cart);
  console.log("Item that you want to buy", itemToBuy);
  const [learnerCourses, setLearnerCourses] = useState([]);
  const shoppingCart = localStorage.getItem("shopping_cart");
  const items = JSON.parse(shoppingCart);
  const [cartItems, setCartItems] = useState(items);
  //Get log in state
  const loggedIn = useSelector((state) => state.loggedInAsLearner);
  const itemsInCart = useSelector((state) => state.increaseItemsAmount);
  const [imageSource, setImageSource] = useState("");
  const [instuctorImageSource, setInstructorImageSource] = useState("");

  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState("");

  const token = localStorage.getItem("token");
  useEffect(() => {
    try {
      const decoded = jwtDecode(token);
      setUserId(decoded.id);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { message: "Please login first!" } });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`https://backend-litlab.herokuapp.com/courses/${Number(id)}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data.course);
        console.log("11", data.course);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      return navigate("/login");
    }

    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    fetch(`https://backend-litlab.herokuapp.com/users/${decoded.id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data revicev", data.courses);
        setLearnerCourses(data.courses);
        data.courses.forEach((course) => {
          if (course.id === Number(id)) {
            console.log("You already own this course");
            setHasCourse(true);
          }
        });
      });
  }, []);

  useEffect(() => {
    console.log(course);
    const imageSource = course?.courseImageURL?.startsWith("https")
      ? course?.courseImageURL
      : `https://backend-litlab.herokuapp.com/images/${course.courseImageURL}`;
    setImageSource(imageSource);
  }, [course, course?.coureseImageURL]);

  useEffect(() => {
    console.log(course);
    const instructorSource = course?.instructorImageURL?.startsWith("https")
      ? course?.instructorImageURL
      : `https://backend-litlab.herokuapp.com/images/${course.instructorImageURL}`;
    setInstructorImageSource(instructorSource);
  }, [course, course?.instructorImageURL]);

  const amount = useSelector((state) => state.increaseItemsAmount);

  const addCourseToCart = () => {
    //Checking if added item exists in cart, if so, then show error, otherwise add item to cart
    const existingItem = cart.find((item) => item.id === singleCourse.id);

    if (!existingItem) {
      const newItem = {
        id: singleCourse?.id,
        name: singleCourse?.name,
        instructor: singleCourse?.instructor,
        courseImageURL: singleCourse?.courseImageURL,
        price: singleCourse.price,
      };

      alert.success("Item added to cart", {
        position: positions.BOTTOM_RIGHT,
        timeout: 2000,
      });
      dispatch(addToCart(newItem));
      dispatch(itemsAmount());

      setCartItems((prev) => [...(Array.isArray(prev) ? prev : []), newItem]);
      const cartItems = JSON.parse(localStorage.getItem("shopping_cart")) || [];
      cartItems.push(newItem);
      localStorage.setItem("amountOfItems", JSON.stringify(cartItems.length));
    } else {
      alert.error("Item exists in cart", {
        position: positions.BOTTOM_RIGHT,
        timeout: 2000,
      });
    }
  };

  const buyNow = async () => {
    localStorage.removeItem("item_to_buy");
    console.log(course);
    if (!loggedIn) {
      return navigate("/login", { state: { loggedIn: false } });
    } else {
      localStorage.setItem(
        "item_to_buy",
        JSON.stringify({
          id: course.id,
          name: course.name,
          price: course.price,
          instructor: course.instructor,
          courseImageURL: course.courseImageURL,
          email: course.email,
        })
      );
      navigate("/payment");
    }
  };

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = (value) => {
    setRating(value);
    setError(false);
  };

  const handleLeaveReview = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString("en-US");

    const newReview = {
      star: rating,
      name: name,
      review: review,
      reviewerId: userId,
      email: course.email,
      date: date,
    };

    fetch("https://backend-litlab.herokuapp.com/review/creator", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: course.email,
        star: rating,
        name: name,
        reviewText: review,
        date: date,
        course: course.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    //checking if user has submitted a review
    const hasSubmittedReview = course.courseReview?.some(
      (course) => course.reviewerId === userId
    );

    // if (hasSubmittedReview) {
    //   alert.error("You already submitted a review", {
    //     position: positions.BOTTOM_RIGHT,
    //     timeout: 5000,
    //   });
    //   return;
    // }

    if (
      review.trim().length === 0 ||
      name.trim().length === 0 ||
      rating.length === 0
    ) {
      setError(true);
      return;
    }
    setError(false);

    fetch(`https://backend-litlab.herokuapp.com/review/course/${Number(id)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    }).then((res) => {
      if (res.status === 201) {
        alert.success("Your review has been added", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000,
        });

        fetch(`https://backend-litlab.herokuapp.com/courses/${Number(id)}`)
          .then((response) => response.json())
          .then((data) => {
            setCourse(data.course);
            setLoading(false);
          });
      }
    });
  };

  useEffect(() => {
    localStorage.setItem("shopping_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleShowAllReviews = () => {
    setShowAllReviews(true);
  };

  const handleHideAllReviews = () => {
    setShowAllReviews(false);
  };

  return (
    <div className={loading && "bottom"}>
      {loading ? (
        <Oval
          height={80}
          width={80}
          color="#0d6efd"
          wrapperStyle={{ position: "absolute", left: "50%", top: "40%" }}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#0d6efd"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      ) : (
        <>
          <div className="bg-light p-3 shadow rounded">
            <div className="row container text-dark">
              <div className="col-lg-8 fs-1 ">
                <p className="fw-bold">{course?.name}</p>
                <p className="fs-5 mt-2">{course?.shortDescription}</p>
                <div className="row ">
                  <div className="col-md-6 d-flex align-items-center">
                    <span className="fs-5">Rating:</span>
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
                  </div>
                </div>
                <p className="fs-5 mt-3">
                  Enrollments:{" "}
                  <span className="fw-bold">
                    {course?.enrollments}
                    <i
                      className="bi bi-people"
                      style={{ marginLeft: "5px" }}
                    ></i>
                  </span>
                </p>
                <p className="fs-5 mt-3">
                  Price: <span className="fw-bold">{course?.price}$</span>
                </p>

                <p className="fs-5 mt-3">
                  Created by:&nbsp;
                  <Link to={`/creator/${course?.instructorId}`}>
                    <span className="fw-bold text-decoration-underline">
                      {course?.instructor}
                    </span>
                  </Link>
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src={imageSource}
                  class="rounded"
                  alt="Course"
                  width={"100%"}
                />

                <div className="buttons d-flex flex-column">
                  {!hasCourse && (
                    <button
                      className="btn btn-outline-primary btn-lg mt-3"
                      onClick={addCourseToCart}
                    >
                      Add to Cart
                    </button>
                  )}

                  {hasCourse ? (
                    <>
                      <Link
                        className="btn btn-lg btn-primary mt-4"
                        to={`/course-view/${course.id}`}
                      >
                        Go to the course
                      </Link>
                    </>
                  ) : (
                    <button
                      className="btn btn-primary btn-lg mt-3"
                      onClick={buyNow}
                    >
                      Buy now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <div className="border p-2">
                <div className="fs-3 fw-bold text-center d-flex justify-content-center align-items-center">
                  <span className="mr-2" style={{ marginRight: "20px" }}>
                    What you will learn{" "}
                  </span>
                  {/* <img
                    src={learningImage}
                    alt="What you will learn"
                    width={"5%"}
                  /> */}
                </div>
                <div className="mt-4">
                  <div className="learn">
                    {course?.pointsToLearn &&
                      course?.pointsToLearn.map((item) => (
                        <>
                          <div className="fs-1">
                            <span style={{ marginRight: "10px" }}>
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"
                                  fill="#0000FF"
                                />
                              </svg>
                            </span>
                            <span className="fs-4">{item.point}</span>
                          </div>
                        </>
                      ))}
                  </div>
                  <p className="mt-5 fw-bold fs-5">{course?.pointsSummary}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5 course-content">
            <div className="mx-auto col-md-8">
              <p className="fs-3 fw-bold">Course Content</p>

              {course?.courseContent &&
                course?.courseContent.map((content, index) => (
                  <p key={index} className="week">
                    <h3 className="text-primary mt-3 mb-3">
                      Week {index + 1} <i class="bi bi-calendar-week"></i>
                    </h3>
                    <ul>
                      {content.week.map((week, i) => (
                        <li
                          key={i}
                          className="week-item bg-light rounded text-dark w-50 p-3"
                        >
                          {week}
                        </li>
                      ))}
                    </ul>
                  </p>
                ))}
            </div>
          </div>

          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <p className="fs-3 fw-bold ">Course Description</p>
              <p className="course-description">{course?.longDescription}</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <p className="fw-bold fs-2">Instructor</p>

              <div className="profile d-flex justify-content-center justify-content-between row mb-5">
                <p className="text-underline text-primary fw-bold fs-2">
                  {course?.instructor}
                </p>
                <img
                  src={instuctorImageSource}
                  alt="Instructor profile"
                  className="col-md-4 instructor-image img rounded-circle"
                />

                <p className="col-md-7 creator-description ">
                  {course?.instructorBio}
                </p>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <p className="fw-bold fs-2">Reviews</p>
              <Row>
                <Col md={7}>
                  {course &&
                    course.courseReview &&
                    course.courseReview
                      .slice(0, showAllReviews ? course.courseReview.length : 3)
                      .map((review) => (
                        <div
                          className="previous-reviews mb-3 p-3 position-relative"
                          key={review.id}
                        >
                          <span
                            className="text-muted position-absolute"
                            style={{ right: "15px", top: "15px" }}
                          >
                            {review.date}
                          </span>
                          <h4>{review.name}</h4>
                          <p>
                            Rating :{" "}
                            {Array.from({ length: review.star }, (_, i) => (
                              <span key={i}>⭐️</span>
                            ))}
                          </p>
                          <p>{review.review} </p>
                        </div>
                      ))}
                  {!showAllReviews &&
                  course.courseReview &&
                  course.courseReview?.length > 3 ? (
                    <div className="text-center">
                      <button
                        onClick={handleShowAllReviews}
                        className="btn btn-primary mb-3 w-100"
                      >
                        Show more reviews
                      </button>
                    </div>
                  ) : showAllReviews &&
                    course.courseReview &&
                    course.courseReview?.length > 3 ? (
                    <div className="text-center">
                      <button
                        onClick={handleHideAllReviews}
                        className="btn btn-primary mb-3 w-100"
                      >
                        Hide reviews
                      </button>
                    </div>
                  ) : course.courseReview?.length === 0 ||
                    !course.courseReview ? (
                    <p className="text-primary fs-3">
                      Be the first one to leave a review!
                    </p>
                  ) : (
                    ""
                  )}
                </Col>
                <Col md={5}>
                  <Form
                    className="review-form"
                    onSubmit={(e) => handleLeaveReview(e)}
                  >
                    <Form.Group controlId="review">
                      <Form.Label className="label_review">
                        <h5>Your Review:</h5>
                      </Form.Label>
                      <Form.Control
                        className="label_review_area"
                        as="textarea"
                        rows={3}
                        onChange={(e) => {
                          setReview(e.target.value);
                          setError(false);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="name">
                      <Form.Label className="label_name">
                        <h5>Your Name:</h5>
                      </Form.Label>
                      <Form.Control
                        className="label_name_area"
                        as="input"
                        onChange={(e) => {
                          setName(e.target.value);
                          setError(false);
                        }}
                      />
                    </Form.Group>
                    <Form.Group controlId="rating">
                      <Form.Label className="label_rating">
                        <h5>Rating:</h5>
                      </Form.Label>
                      <div className="rating">
                        {[...Array(5)].map((star, i) => {
                          const ratingValue = i + 1;
                          return (
                            <label key={i}>
                              <input
                                type="radio"
                                name="rating"
                                value={ratingValue}
                                onClick={() => {
                                  handleRating(ratingValue);
                                  console.log(ratingValue);
                                }}
                              />
                              <span
                                className={
                                  ratingValue <= (hover || rating)
                                    ? "active"
                                    : "inactive"
                                }
                                onMouseEnter={() => setHover(ratingValue)}
                                onMouseLeave={() => setHover(0)}
                              >
                                &#9733;
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </Form.Group>
                    {error && (
                      <p className="text-danger m-0">
                        Please fill in all fields.
                      </p>
                    )}
                    <Button
                      id="reviews"
                      className="btn_submit"
                      variant="primary"
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Form>
                </Col>
              </Row>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function IconDisplay(props) {
  const { value, icon } = props;

  // create an array of icons based on the input value
  const icons = [];
  for (let i = 0; i < value; i++) {
    icons.push(<span key={i}>{icon}</span>);
  }

  return <div>{icons}</div>;
}
<IconDisplay value={3} />;

export default CourseDescription;
