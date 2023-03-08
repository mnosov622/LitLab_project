import React, { useEffect, useState } from "react";
import Img from "../../assets/creator.jpg";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
import "./Info.styles.scss";
import javascriptTeacher from "../../assets/javascript-teacher.jpg";
import teacher1 from "../../assets/teacher-1.jpg";
import influenceTeacher from "../../assets/influence-teacher.jpg";
import CourseCard from "../../components/CourseCards/CourseCard";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const CreatorInformation = () => {
  const [course, setCourse] = useState("");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/courses/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        console.log("data", data);
      });
  }, []);

  return (
    <Container>
      <div className="divlayout">
        <Row className="topLine">
          <Col xs={12} md={3}>
            <Image
              className="img"
              src={course.instructorImageURL}
              roundedCircle
            />
          </Col>
          <Col xs={12} md={9}>
            <div className="creatorName text-primary">{course.instructor}</div>
            <div className="creatorInformation">
              {course.instructorDescription}
            </div>
          </Col>
        </Row>
        <Row className="middleLine">
          <div className="titleInfo">About Professional Career</div>
          <div className="aboutInfo">
            <p>{course.instructorBio}</p>
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
          ))} */}
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
