import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

  //Get log in state
  const loggedIn = useSelector((state) => state.loggedInAsLearner);
  const itemsInCart = useSelector((state) => state.increaseItemsAmount);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8000/courses/${Number(singleCourse.id)}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data.course);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    fetch(`http://localhost:8000/users/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA", data);
        setLearnerCourses(data.courses);
        learnerCourses.map((course) => {
          // if (course.id === id) {
          //   console.log("user owns this course");
          // }
          // return 0;
          if (course.id === Number(id)) {
            setHasCourse(true);
          }
        });
      });
  }, []);
  //TODO: Add all items from object to the cart
  const addCourseToCart = () => {
    //Checking if added item exists in cart, if so, then show error, otherwise add item to cart
    const existingItem = cart.find((item) => item.id === singleCourse.id);

    if (!existingItem) {
      const newItem = {
        id: singleCourse?.id,
        name: singleCourse?.name,
        instructor: singleCourse?.instructor,
        courseImage: singleCourse.courseImageURL,
        price: singleCourse.price,
      };

      alert.success("Item added to cart", {
        position: positions.BOTTOM_RIGHT,
        timeout: 2000, // custom timeout just for this one alert
      });
      dispatch(addToCart(newItem));
      dispatch(itemsAmount());
      console.log("AMOUNT Of items", itemsAmount);
    } else {
      alert.error("Item exists in cart", {
        position: positions.BOTTOM_RIGHT,
        timeout: 2000, // custom timeout just for this one alert
      });
    }
  };

  const buyNow = async () => {
    localStorage.removeItem("item_to_buy");
    console.log("LOGIN STATE", loggedIn);

    if (!loggedIn) {
      return navigate("/login", { state: { loggedIn: false } });
    } else {
      localStorage.setItem(
        "item_to_buy",
        JSON.stringify({
          id: singleCourse.id,
          name: singleCourse.name,
          price: singleCourse.price,
          instructor: singleCourse.instructor,
          image: singleCourse.courseImageURL,
        })
      );
      navigate("/payment");
    }
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
                <p className="fw-bold">{course.name}</p>
                <p className="fs-5 mt-2">{course.shortDescription}</p>
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
                    {course.enrollments}
                    <i class="bi bi-people" style={{ marginLeft: "5px" }}></i>
                  </span>
                </p>
                <p className="fs-5 mt-3">
                  Created by:&nbsp;
                  <Link to={`/creator/${course.instructorId}`}>
                    <span className="fw-bold text-decoration-underline">
                      {course.instructor}
                    </span>
                  </Link>
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  className="rounded"
                  src={course.courseImageURL}
                  alt="Course"
                  width={"100%"}
                />
                <div className="buttons d-flex flex-column">
                  <button
                    className="btn btn-outline-primary btn-lg mt-3"
                    onClick={addCourseToCart}
                  >
                    Add to Cart
                  </button>
                  {hasCourse ? (
                    <p className="fs-4 text-dark text-center">
                      You already bought this course
                    </p>
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
                  <img
                    src={learningImage}
                    alt="What you will learn"
                    width={"5%"}
                  />
                </div>
                <div className="mt-4">
                  <div className="learn">
                    {course.pointsToLearn &&
                      course.pointsToLearn.map((item) => (
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

                  <p className="mt-5 fw-bold fs-5">{course.pointsSummary}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <p className="fs-3 fw-bold">Course Content</p>
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Week 1: Introduction to Angular
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>Understanding the components of Angular</li>
                        <li>Setting up an Angular project</li>
                        <li>Creating templates and services overflow.</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Week 2: Node.js Fundamentals
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>Understanding the basics of Node.js</li>
                        <li>Building a server-side application</li>
                        <li>CUsing npm to manage dependencies</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Week 3: MongoDB and Database Integration
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>Understanding the basics of MongoDB</li>
                        <li>Integrating MongoDB with a Node.js application</li>
                        <li>Using npm to manage dependencies</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Week 4: Full Stack Development
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          Building a full-stack web application with Angular and
                          Node
                        </li>
                        <li>
                          Understanding the communication between the front-end
                          and back-end
                        </li>
                        <li>
                          Implementing user authentication and authorization
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      Week 5: Advanced Topics
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>Creating reusable components</li>
                        <li>Best practices for building web applications</li>
                        <li>Deploying a full-stack web application</li>
                        <li>Troubleshooting and debugging</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSix">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Week 6: Project
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      <ul>
                        <li>
                          Building a final project utilizing all the knowledge
                          learned throughout the course
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <p className="fs-3 fw-bold">Course Description</p>
              <p className="course-description">{course.longDescription}</p>
            </div>
          </div>

          <div className="row mt-5">
            <div className="mx-auto col-md-8">
              <p className="fw-bold fs-2">Instructor</p>

              <div className="profile d-flex justify-content-center justify-content-between row mb-5">
                <p className="text-underline text-primary fw-bold fs-2">
                  {course.instructor}
                </p>
                <img
                  src={course.instructorImageURL}
                  alt="Instructor profile"
                  className="col-md-4 instructor-image"
                />

                <p className="col-md-8 creator-description ">
                  {course.instructorBio}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDescription;
