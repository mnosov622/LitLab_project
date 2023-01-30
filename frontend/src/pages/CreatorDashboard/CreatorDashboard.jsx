import React from "react";
import { useEffect } from "react";
import CourseCard from "../../components/CourseCards/CourseCard";
import CreatorCourseCard from "../../components/CreatorCourseCard/CreatorCourseCard";
import jwtDecode from "jwt-decode";

const CreatorDashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    fetch(`http://localhost:8000/users/${userId}`)
      .then((response) => {
        response.json();
      })
      .then((data) => {
        console.log(data);
      });
  });

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
