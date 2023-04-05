import React, { useEffect, useState } from "react";
import Img from "../../assets/creator.jpg";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import "./Info.styles.scss";
import javascriptTeacher from "../../assets/javascript-teacher.jpg";
import teacher1 from "../../assets/teacher-1.jpg";
import influenceTeacher from "../../assets/influence-teacher.jpg";
import CourseCard from "../../components/CourseCards/CourseCard";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAlert, positions } from "react-alert";
import jwtDecode from "jwt-decode";

const CreatorInformation = () => {
  const alert = useAlert();
  const [course, setCourse] = useState("");
  const { id } = useParams();
  console.log("id is", id);
  const location = useLocation();
  const instructorName = new URLSearchParams(location.search).get("name");
  console.log("instructorName is", instructorName);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState(false);
  const [imageSource, setImageSource] = useState("");

  const [creatorData, setCreatorData] = useState([]);
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  useEffect(() => {
    // fetch(`http://localhost:8000/courses/${id}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setCourse(data.course);
    //     console.log("data11", data);
    //   });

    fetch(
      `http://localhost:8000/creatorprofile/name/?name=${encodeURIComponent(
        instructorName
      )}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // handle data returned from the server
        console.log(data);
        setCreatorData(data);
      })
      .catch((error) => {
        // handle errors
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  // const instructorCourses = courses.filter(
  //   (c) => c.instructorId === Number(id)
  // );

  const handleRating = (value) => {
    setRating(value);
    setError(false);
  };

  const handleLeaveReview = (e) => {
    e.preventDefault();

    // if (creatorData.creatorReview) {
    //   const hasSubmittedReview = creatorData.creatorReview.some(
    //     (course) => course.reviewerId === userId
    //   );

    //   if (hasSubmittedReview) {
    //     alert.error("You already submitted a review", {
    //       position: positions.BOTTOM_RIGHT,
    //       timeout: 5000,
    //     });
    //     return;
    //   }
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

    const date = new Date().toLocaleDateString("en-US");

    const newReview = {
      star: rating,
      name: name,
      reviewText: review,
      reviewerId: userId,
      email: creatorData.email,
      instructorName: creatorData.instructor,
      date: date,
    };

    fetch(`http://localhost:8000/review/creator`, {
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
        fetch(`http://localhost:8000/courses/${Number(id)}`)
          .then((response) => response.json())
          .then((data) => {
            setCreatorData(data.course);
          });
      }
    });
    fetch(`http://localhost:8000/review/creator/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });
  };

  useEffect(() => {
    const imageSource = creatorData?.instructorImageURL?.startsWith("https")
      ? creatorData?.instructorImageURL
      : `http://localhost:8000/images/${creatorData.instructorImageURL}`;
    setImageSource(imageSource);
  }, [creatorData, creatorData?.instructorImageURL]);

  return (
    <Container>
      <div className="divlayout">
        <Row className="topLine">
          <Col xs={12} md={3}>
            <Image className="img" src={imageSource} roundedCircle />
          </Col>
          <Col xs={12} md={9}>
            <div className="creatorName text-primary">
              {creatorData.instructor}
            </div>
            <div className="creatorInformation">
              {creatorData.instructorBio}
            </div>
          </Col>
        </Row>
        <Row className="middleLine">
          <div className="titleInfo">About Professional Career</div>
          <div className="aboutInfo">
            <p>{creatorData.instructorDescription}</p>
          </div>
        </Row>
        <div className="coursetitle">Courses</div>
        <div className="row">
          {/* {course.map((c) => (
            <CourseCard
              key={c.id}
              cardSmall
              name={c.name}
              price={c.price}
              creatorCourseImage={c.courseImageURL}
              id={c.id}
              rating={c.rating}
            />
<<<<<<< HEAD
          ))} */}

          <div className="row mt-5">
            <div className="mx-auto col-md-12">
              <p className="fw-bold fs-2">Reviews</p>
              <Row>
                <Col xs={7}>
                  {creatorData &&
                    creatorData.creatorReview &&
                    creatorData.creatorReview.map((review) => (
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
                        <p>{review.reviewText} </p>
                      </div>
                    ))}
                </Col>
                <Col xs={5}>
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
                                onClick={() => handleRating(ratingValue)}
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

          {/* <div className="col-md">
            <CourseCard
              name="React - The complete Guide"
              image={teacher1}
              price="19$"
              teacherName="Simona Gareth"
            />
          </div>
          <div className="col-md">
            <CourseCard
              name="Javascript - From Zero to Hero"
              image={javascriptTeacher}
              price="25$"
              teacherName="Kyle Thompson"
            />
          </div>
          <div className="col-md">
            <CourseCard
              name="Influence - Psychology of Persuasion"
              image={influenceTeacher}
              price="22$"
              teacherName="Mark Forgheit"
            />
          </div>
          <div className="col-md">
            <CourseCard
              name="Influence - Psychology of Persuasion"
              image={influenceTeacher}
              price="22$"
              teacherName="Mark Forgheit"
            />
          </div> */}
        </div>
      </div>
    </Container>
  );
};

export default CreatorInformation;
