import React from "react";
import Img from "../../assets/creator.jpg";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import "./Info.styles.scss";
import javascriptTeacher from "../../assets/javascript-teacher.jpg";
import teacher1 from "../../assets/teacher-1.jpg";
import influenceTeacher from "../../assets/influence-teacher.jpg";
import CourseCard from "../../components/CourseCards/CourseCard";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatorInformation = () => {
  const { id } = useParams();
  const courses = useSelector((state) => state.coursesReducer);
  console.log("ALL COURSES", courses);
  const instructor = courses.find((c) => c.instructorId === Number(id));

  const instructorCourses = courses.filter(
    (c) => c.instructorId === Number(id)
  );
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  const handleRating = (value) => {
    setRating(value);
  };
  
  console.log("INSTRUCTOR COURSES", instructorCourses);
  return (
    <Container>
      <div className="divlayout">
        <Row className="topLine">
          <Col xs={12} md={3}>
            <Image
              className="img"
              src={instructor.instructorImageURL}
              roundedCircle
            />
          </Col>
          <Col xs={12} md={9}>
            <div className="creatorName text-primary">
              {instructor.instructor}
            </div>
            <div className="creatorInformation">Computer Science Professor</div>
          </Col>
        </Row>
        <Row className="middleLine">
          <div className="titleInfo">About Professional Career</div>
          <div className="aboutInfo">
            <p>
              A professional career refers to an individual's chosen occupation
              or field of work. It usually involves specialized training,
              education, and skills in a specific area, and often requires a
              certain level of expertise or certification. A professional career
              can include a wide range of fields such as law, medicine, finance,
              engineering, and technology, among many others. In order to build
              a professional career, individuals typically start by obtaining
              the necessary education and training in their chosen field. This
              can include a degree from a university or college, as well as
              additional certifications or licenses. After completing their
              education and training, individuals can then begin to look for job
              opportunities in their field, either through direct application or
              through networking with professionals in their industry.
            </p>
          </div>
        </Row>
        <div className="coursetitle">Courses</div>
        <div className="row">
          {instructorCourses.map((course) => (
            <CourseCard
              key={course.id}
              cardSmall
              name={course.name}
              price={course.price}
              creatorCourseImage={course.courseImageURL}
              id={course.id}
              rating={course.rating}
            />
          ))}
          <div className="row mt-5">
            <div className="mx-auto col-md-12">
            <p className="fw-bold fs-2">Review</p>
            <Row>
              <Col xs={7}>
              <div className="previous-reviews">
                  <div  className="review-card">
                    <h4>Name : XYZ</h4>
                    <p>Rating : star</p>
                    <p>Review: abc abc </p>
                  </div>
              </div>
              <div className="previous-reviews">
                  <div  className="review-card">
                    <h4>Name : XYZ</h4>
                    <p>Rating : star</p>
                    <p>Review: abc abc </p>
                  </div>
              </div>
              <div className="previous-reviews">
                  <div  className="review-card">
                    <h4>Name : XYZ</h4>
                    <p>Rating : star</p>
                    <p>Review: abc abc </p>
                  </div>
              </div>
              <div className="previous-reviews">
                  <div  className="review-card">
                    <h4>Name : XYZ</h4>
                    <p>Rating : star</p>
                    <p>Review: abc abc </p>
                  </div>
              </div>
              <div className="previous-reviews">
                  <div  className="review-card">
                    <h4>Name : XYZ</h4>
                    <p>Rating : star</p>
                    <p>Review: abc abc </p>
                  </div>
              </div>
              </Col>
              <Col xs={5}>
              <Form className="review-form">
                <Form.Group controlId="review">
                  <Form.Label className="label_review"><h5>Your Review:</h5></Form.Label>
                  <Form.Control className="label_review_area" as="textarea" rows={3} />
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label className="label_name"><h5>Your Name:</h5></Form.Label>
                  <Form.Control className="label_name_area" as="input" />
                </Form.Group>
                <Form.Group controlId="rating">
                  <Form.Label className="label_rating"><h5>Rating:</h5></Form.Label>
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
                              ratingValue <= (hover || rating) ? "active" : "inactive"
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
                <Button className="btn_submit" variant="primary" type="submit">
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
