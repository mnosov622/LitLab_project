import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/CourseCards/CourseCard";
import Modal from "../../../components/Modal/Modal";
import "../admindashboard.css";

const Users = () => {
  const [usersData, setUsersData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [singleUserData, setSingleUserData] = useState([]);

  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleShowModal = (courseName) => {
    setSelectedCourse(courseName);
    setShowDeleteCourseModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleShowDeleteUserModal = (email) => {
    console.log("email", email);
    setShowDeleteUserModal(true);
    setSelectedUser(email);
    document.body.style.overflow = "hidden";
  };

  const handleHideModal = () => {
    setShowDeleteCourseModal(false);
    setShowDeleteUserModal(false);
    setShowEditUserModal(false);
    setShowEditCourseModal(false);
    document.body.style.overflow = "visible";
  };

  const handleConfirm = (name) => {
    // handle confirm action
    console.log(name);
    fetch(`https://backend-litlab.herokuapp.com/courses/${name}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setShowDeleteUserModal(false);
          fetch("https://backend-litlab.herokuapp.com/courses")
            .then((res) => res.json())
            .then((data) => setCoursesData(data));
        }
      })
      .catch((e) => console.log(e));
    handleHideModal();
    document.body.style.overflow = "visible";
  };

  const handleConfirmDeleteUser = (email) => {
    fetch(`https://backend-litlab.herokuapp.com/users/${email}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setShowDeleteUserModal(false);
          fetch("https://backend-litlab.herokuapp.com/users")
            .then((res) => res.json())
            .then((data) => setUsersData(data));
        }
      })
      .catch((e) => console.log(e));
    document.body.style.overflow = "visible";
  };

  const handleConfirmEditUser = () => {};

  const handleCancel = () => {
    // handle cancel action
    handleHideModal();
    document.body.style.overflow = "visible";
  };

  const handleOpenEditModal = (id, email) => {
    console.log("id of user", id);
    setShowEditUserModal(true);
    setSelectedUser(email);

    fetch(`https://backend-litlab.herokuapp.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUserData(data);
        console.log(data);
      });
  };

  const handleOpenEditCourseModal = (name, id) => {
    console.log("id and name", id, name);
    setShowEditCourseModal(true);
    setSelectedCourse(id);
    fetch(`https://backend-litlab.herokuapp.com/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUserData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetch("https://backend-litlab.herokuapp.com/users")
      .then((res) => res.json())
      .then((data) => setUsersData(data));

    fetch("https://backend-litlab.herokuapp.com/courses")
      .then((res) => res.json())
      .then((data) => setCoursesData(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <h2 className="text-center mb-5">All Users</h2>
      <div className="table-responsive">
        <table className="table table-light fs-5 border w-100">
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
                    onClick={() => handleShowDeleteUserModal(user.email)}
                  >
                    Delete user
                  </button>
                  &nbsp; &nbsp;
                  <button
                    className="btn btn-info"
                    onClick={() => handleOpenEditModal(user._id, user.email)}
                  >
                    Edit User Information
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="row mt-5">
        <h2 className="text-center mb-5">All Courses</h2>
        <div className="table-responsive">
          <Table bordered hover className="text-dark fs-5 table-light w-100">
            <thead>
              <tr>
                <th>Name</th>
                <th>
                  Instructor <i class="bi bi-person"></i>
                </th>
                <th>Price $</th>
                <th>Enrollments</th>
                <th className="text-center">Actions</th>
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
                      onClick={() => handleShowModal(course.name)}
                    >
                      Delete course
                    </button>

                    <button
                      className="btn btn-info"
                      onClick={() =>
                        handleOpenEditCourseModal(course.name, course.id)
                      }
                    >
                      Edit course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {showDeleteCourseModal && (
        <Modal
          title="Confirm Action"
          body={`Are you sure you want to delete course`}
          item={selectedCourse}
          onConfirm={() => handleConfirm(selectedCourse)}
          onCancel={handleCancel}
        />
      )}

      {showDeleteUserModal && (
        <Modal
          title="Confirm Action"
          body={`Are you sure you want to delete user`}
          item={selectedUser}
          onConfirm={() => handleConfirmDeleteUser(selectedUser)}
          onCancel={handleCancel}
        />
      )}

      {showEditUserModal && (
        <Modal
          title="Edit User"
          body={``}
          item={selectedUser}
          id={singleUserData._id}
          onConfirm={() => handleConfirmEditUser(selectedUser)}
          onCancel={handleCancel}
          editUser
        />
      )}

      {showEditCourseModal && (
        <Modal
          title="Edit Course"
          body={``}
          item={selectedCourse}
          onConfirm={() => handleConfirm(selectedCourse)}
          onCancel={handleCancel}
          editCourse
        />
      )}
    </div>
  );
};

export default Users;
