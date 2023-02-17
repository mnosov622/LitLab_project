import React, { useEffect, useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/CourseCards/CourseCard";

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

  return (
    <div>
      <h2 className="text-center mb-4">All Users</h2>
      <table className="table  table-light fs-5">
        <thead className="border">
          <tr className="text-dark">
            <th>Name</th>
            <th>Email</th>
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
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container mt-5 text-center">
        <Link to="/all-courses" className="btn btn-primary btn-lg">
          See all courses
        </Link>
      </div>
    </div>
  );
};

export default Users;
