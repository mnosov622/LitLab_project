import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/CourseCards/CourseCard";
import { Allcourses } from "../../store/actions";

const AllCourses = () => {
  //you can find all the courses in this variable
  const courses = useSelector((state) => state.coursesReducer);
  console.log(courses);

  return (
    <div className="row">
      {courses.map((course) => (
        <div className="col-md-4">
          <CourseCard
            key={course.id}
            id={course.id}
            name={course.name}
            //  image={teacher1}
            price={course.price}
            teacherName={course.instructor}
          />
        </div>
      ))}
    </div>
  );
};

export default AllCourses;
