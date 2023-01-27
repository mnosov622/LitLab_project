import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/CourseCards/CourseCard";
import { Allcourses } from "../../store/actions";
import { loggedInAsLearner } from "../../store/reducers/loginAsLearner";

const AllCourses = () => {
  //you can find all the courses in this variable
  const courses = useSelector((state) => state.coursesReducer);
  console.log(courses);
  const loggedIn = useSelector((state) => state.loggedInAsLearner);
  console.log("USER is", loggedIn);

  return (
    <>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mt-2">
            <CourseCard
              key={course.id}
              id={course.id}
              name={course.name}
              image={course.courseImageURL}
              price={course.price}
              teacherName={course.instructor}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AllCourses;
