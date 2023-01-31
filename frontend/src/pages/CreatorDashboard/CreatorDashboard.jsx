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
    const userId = decoded.id;
    console.log(userId);

    //List of courses for certain creator, get by user id from the token
    try {
      fetch(`http://localhost:8000/creator-courses/${userId}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log("Data received from server:", data);
          setCourses((data) => {
            console.log("Courses after state update:", data);
            return data;
          });
        });
    } catch (e) {
      console.log("Something went wrong", e);
    }
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
