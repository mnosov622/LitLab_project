import React from "react";
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
  const { id } = useParams();
  const courses = useSelector((state) => state.coursesReducer);
  console.log("ALL COURSES", courses);
  const instructor = courses.find((c) => c.instructorId === Number(id));

  const instructorCourses = courses.filter(
    (c) => c.instructorId === Number(id)
  );
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
              courseImage={course.courseImageURL}
              id={course.id}
              rating={course.rating}
            />
          ))}
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
