import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/CourseCards/CourseCard";
import "../admindashboard.css";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsersData(data));

    fetch("http://localhost:8000/courses")
      .then((res) => res.json())
      .then((data) => setCoursesData(data));
  }, []);

  const removeUser = (email) => {
    if (window.confirm("Are you sure you want to delete this user ?")) {
      fetch(`http://localhost:8000/users/${email}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((e) => console.log(e));
    }
  };

  const deleteCourse = (name) => {
    console.log("delete course with id", name);
    if (window.confirm("Are you sure you want to delete this course ?")) {
      fetch(`http://localhost:8000/courses/${name}`, {
        method: "DELETE",
      })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            window.location.reload();
          }
        })
        .catch((e) => console.log(e));
    }
  };
  return (
    <div>
      <h2 className="text-center mb-5">All Users</h2>
      <table className="table  table-light fs-5 border">
        <thead className="border">
          <tr className="text-dark">
            <th>Name</th>
            <th>Email</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td className="text-dark">{user.name}</td>
              <td className="text-dark">{user.email}</td>
              <td className="text-dark">
                <a href={`mailto:${user.email}`} className="btn btn-primary">
                  Contact
                </a>
              </td>
              <td className="buttons-wrapper">
                <button
                  className="btn btn-danger"
                  onClick={() => removeUser(user.email)}
                >
                  Delete user
                </button>
                &nbsp; &nbsp;
                <button className="btn btn-info">Edit User Information</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row mt-5">
        <h2 className="text-center mb-5">All Courses</h2>
        <Table bordered hover className="text-dark fs-5 table-light">
          <thead>
            <tr>
              <th>Name</th>
              <th>
                Instructor <i class="bi bi-person"></i>
              </th>
              <th>Price $</th>
              <th>Enrollments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesData.map((course) => (
              <tr key={course.name}>
                <td>{course.name}</td>
                <td cl>{course.instructor}</td>
                <td>{course.price}</td>
                <td>{course.enrollments}</td>
                <td className="d-flex justify-content-between border-0">
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteCourse(course.name)}
                  >
                    Delete course
                  </button>

                  <button className="btn btn-info">Edit course</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Users;
