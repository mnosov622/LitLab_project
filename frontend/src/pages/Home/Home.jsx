import React from "react";
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

const Home = () => {
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
                <Link to="signup" className="">
                  <button className="btn btn-lg btn-primary w-100">
                    Start Learning
                  </button>
                </Link>
              </div>
              <div className="col-6">
                <button className="btn btn-lg btn-outline-primary">
                  Become content creator
                </button>
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
      <div className="row mt-5">
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
                image={teacher1}
                price="19$/month"
                teacherName="Simona Gareth"
              />
            </div>
            <div className="col-md-4">
              <CourseCard
                name="Javascript - From Zero to Hero"
                image={javascriptTeacher}
                price="25$/month"
                teacherName="Kyle Thompson"
              />
            </div>
            <div className="col-md-4">
              <CourseCard
                name="Influence - Psychology of Persuasion"
                image={influenceTeacher}
                price="22$/month"
                teacherName="Mark Forgheit"
              />
            </div>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-12">
            <p className="fs-1 text-center">Courses you can explore today</p>
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
    </>
  );
};

export default Home;
