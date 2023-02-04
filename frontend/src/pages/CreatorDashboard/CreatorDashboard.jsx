import React from "react";
import { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import CreatorCourseCard from "../../components/CreatorCourseCard/CreatorCourseCard";
import jwtDecode from "jwt-decode";
import { useState } from "react";

const CreatorDashboard = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userEmail = decoded.email;
    console.log(userEmail);

    //get request to the user to find all courses for content creator
  }, []);

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-4">
        <p>My Courses</p>
      </div>
      <CreatorCourseCard />
    </>
  );
};

export default CreatorDashboard;
