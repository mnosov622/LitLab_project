import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import teacher from "../../assets/home_teacher.png";
import styles from "./styles.module.scss";
import google from "../../assets/google.png";
import ibm from "../../assets/IBM.png";
import stanford from "../../assets/stanford.png";
import CourseCard from "../../components/CourseCards/CourseCard";
import javascriptTeacher from "../../assets/javascript-teacher.jpg";
import teacher1 from "../../assets/teacher-1.jpg";
import influenceTeacher from "../../assets/influence-teacher.jpg";
import CourseCategoryCard from "../../components/CourseCategoryCard/CourseCategoryCard";
import reviewImage1 from "../../assets/review-image1.jpg";
import reviewImage2 from "../../assets/review-image2.jpg";
import reviewImage3 from "../../assets/review-image3.jpg";
import ReviewCard from "../../components/ReviewCard/ReviewCard";
import teacher2 from "../../assets/teacher2.jpg";
import fullStackTeacher from "../../assets/Full-stack-teacher.jpg";
import { useSelector } from "react-redux";

const Home = () => {
  const courses = useSelector((state) => state.coursesReducer);

  const cart = useSelector((state) => state.cartReducer);
  useEffect(() => {
    const visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
    localStorage.setItem('visitorCount', visitorCount + 1);
  }, []);
  console.log("CART", cart);
  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div className={styles.about}>
            <p className={styles.title}>Learn from certified professionals</p>
            <p className={styles.subtitle}>
              With LitLab you can learn any topic you want, get certification
              and connect with other learners.​
            </p>
            <div className="row">
              <div className="col-4">
                <Link to="/learner-signup" className="">
                  <button className="btn btn-lg btn-primary w-100">
                    Start Learning
                  </button>
                </Link>
              </div>
              <div className="col-6">
                <Link to="/creator-signup" className="">
                  <button className="btn btn-lg btn-outline-primary">
                    Become content creator
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 offset-1">
          <img src={teacher} alt="Teacher" />
        </div>
      </div>
      <div className="row mt-5 container-fluid">
        <div className="col-md-12">
          <p className="text-center fw-bold fs-1 mt-5">
            Our courses are used for people in
            <span className="text-primary"> 300+ companies</span>
          </p>
        </div>
        <div className="row text-center">
          <div className="col-4">
            <img src={google} alt="Google" />
          </div>
          <div className="col-4">
            <img src={ibm} alt="IBM" />
          </div>
          <div className="col-4">
            <img src={stanford} alt="Stanford College" />
          </div>
          {/* <div className="col">
            <img style={{ width: "30%" }} src={seneca} alt="Seneca College" />
          </div> */}
        </div>
      </div>
      <div className="row mt-5" id="most-popular">
        <div className="col-md-12 mt-5 fs-2">
          <p className="mt-5 title text-primary">
            Get certificate for your field
          </p>
          <p className="subtitle fs-3">
            Boost your career with most popular courses on LitLab
          </p>
          <div className="row">
            <div className="col-md-4">
              <CourseCard
                name="React - The complete Guide"
                id="1"
                image={teacher1}
                price="45"
                teacherName="Simona Gareth"
                homeImage
              />
            </div>
            <div className="col-md-4">
              <CourseCard
                name="Javascript - From Zero to Hero"
                id="2"
                image={javascriptTeacher}
                price="55"
                teacherName="Kyle Thompson"
                homeImage
              />
            </div>
            <div className="col-md-4">
              <CourseCard
                name="Influence - Psychology of Persuasion"
                id="3"
                image={influenceTeacher}
                price="45"
                teacherName="Mark Forgheit"
                homeImage
              />
            </div>
            <Link to="/all-courses" className="text-center ">
              <button className="btn btn-primary btn-lg">
                See other courses
              </button>
            </Link>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <p className="fs-1 text-center mb-5">
              Courses you can explore{" "}
              <span className={styles.gradientColor}> today</span>
            </p>
          </div>
        </div>
        <div className="col-md-3 mt-2 category">
          <CourseCategoryCard name="Computer Science" courseCount="153" />
        </div>
        <div className="col-md-3 mt-2 category">
          <CourseCategoryCard name="Language Learning" courseCount="57" />
        </div>
        <div className="col-md-3 mt-2 category">
          <CourseCategoryCard name="Psychology" courseCount="188" />
        </div>
        <div className="col-md-3 mt-2 category">
          <CourseCategoryCard name="Personal Development" courseCount="133" />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-12 text-center fs-1 mt-5">
          What people say about us
        </div>
      </div>
      <div className="row text-center border-bottom">
        <div className="col-md-4 ">
          <ReviewCard
            image={reviewImage1}
            name="Linda Marlen"
            review="The experience that I got through the computer science course can't
            be measured. During the course I built a lot of confidence that
            helped me to find my dream job."
          />
        </div>
        <div className="col-md-4">
          <ReviewCard
            image={reviewImage3}
            name="Jack Robertson"
            review="LitLab helped to change my career. As most of the students, after graduation I didn't know exactly where to go, but thanks to this platform I found things that I love, learnt valuable skills and met like-minded people."
          />
        </div>
        <div className="col-md-4">
          <ReviewCard
            image={reviewImage2}
            name="Melisa Thurman "
            review="I love the way they teach you at LitLab. Each course has different level of experience you need to have before you start. Tons of courses for your development."
          />
        </div>
      </div>

      <div className="row mt-5 d-flex align-items-center mb-5">
        <div className="col-md-6 mt-5">
          <img className="w-100 rounded" src={teacher2} alt="Teacher" />
        </div>
        <div className="offset-1 col-md-5 mt-5 ">
          <p className="mt-2 fs-1 text-primary">Stand out from the crowd</p>
          <p className="fs-2">
            Complete courses, get certificate and provide value at the market
            today.
          </p>
          <Link to="/learner-signup">
            <button className="btn btn-lg btn-primary mt-5">
              Get personalized experience
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
