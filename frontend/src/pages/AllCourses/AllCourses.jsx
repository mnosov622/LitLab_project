import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Allcourses } from "../../store/actions";

const AllCourses = () => {
  //you can find all the courses in this variable
  const courses = useSelector((state) => state.coursesReducer);
  console.log(courses);

  return <div>AllCourses</div>;
};

export default AllCourses;
