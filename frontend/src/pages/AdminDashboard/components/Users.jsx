import React, { useEffect, useState } from "react";
import { Card, ListGroup, ListGroupItem, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "../../../components/CourseCards/CourseCard";
import Modal from "../../../components/Modal/Modal";
import "../admindashboard.css";
import jwtDecode from "jwt-decode";
import { useAlert, positions } from "react-alert";
import "../css/component/featuredInfo.css";

const Users = () => {
  const alert = useAlert();
  const [usersData, setUsersData] = useState([]);
  const [coursesData, setCoursesData] = useState([]);
  const [singleUserData, setSingleUserData] = useState([]);

  const [showDeleteCourseModal, setShowDeleteCourseModal] = useState(false);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [adminData, setAdminData] = useState("");
  const visitorCount = parseInt(localStorage.getItem("visitorCount")) || 0;
  const learnerCount = parseInt(localStorage.getItem("learnerCount")) || 0;
  const creatorVisitorCount = parseInt(localStorage.getItem("creatorVisitorCount")) || 0;

  const handleShowModal = (courseName) => {
    setSelectedCourse(courseName);
    setShowDeleteCourseModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleShowDeleteUserModal = (email) => {
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

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  useEffect(() => {
    fetch(`http://localhost:8000/users/${decoded.id}`)
      .then((res) => res.json())
      .then((data) => setAdminData(data));
  }, []);

  const handleConfirm = (name) => {
    // handle confirm action
    fetch(`http://localhost:8000/courses/${name}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setShowDeleteUserModal(false);
          fetch("http://localhost:8000/courses")
            .then((res) => res.json())
            .then((data) => setCoursesData(data));
        }
      })
      .catch((e) => console.log(e));
    handleHideModal();
    document.body.style.overflow = "visible";
  };

  const handleConfirmDeleteUser = (email) => {
    fetch(`http://localhost:8000/users/${email}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          setShowDeleteUserModal(false);
          fetch("http://localhost:8000/users")
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
    setShowEditUserModal(true);
    setSelectedUser(email);

    fetch(`http://localhost:8000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUserData(data);
      });
  };

  const handleOpenEditCourseModal = (name, id) => {
    setShowEditCourseModal(true);
    setSelectedCourse(id);
    fetch(`http://localhost:8000/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleUserData(data);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => res.json())
      .then((data) => setUsersData(data));

    fetch("http://localhost:8000/courses")
      .then((res) => res.json())
      .then((data) => setCoursesData(data))
      .catch((e) => console.log(e));
  }, []);

  const handleApprove = (userEmail, amount) => {
    fetch(`http://localhost:8000/users/moneyEarned/${userEmail}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));

    fetch(`http://localhost:8000/users/withdrawals/${userEmail}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        fetch("http://localhost:8000/users/withdraw/notify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: userEmail,
            amount: amount,
            text: "approved",
            status: "Success",
          }),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Request failed.");
            }
          })
          .then((data) => {})
          .catch((error) => {
            console.error(error);
          });

        alert.success("Request was approved", {
          position: positions.BOTTOM_RIGHT,
          timeout: 2000,
        });
        setTimeout(() => {
          fetch(`http://localhost:8000/users/${decoded.id}`)
            .then((res) => res.json())
            .then((data) => setAdminData(data));
        }, 2000);
      })

      .catch((error) => {
        console.error("Error removing withdrawal request:", error);
      });
  };

  const handleReject = (userEmail, amount) => {
    fetch(`http://localhost:8000/users/withdrawals/${userEmail}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    });

    fetch("http://localhost:8000/users/withdraw/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userEmail: userEmail,
        amount: amount,
        text: "rejected",
        status: "Failure",
        failureMessage: "Please try again later or contact customer support",
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Request failed.");
        }
      })
      .then((data) => {})
      .catch((error) => {
        console.error(error);
      });

    alert.success("Request was rejected", {
      position: positions.BOTTOM_RIGHT,
      timeout: 2000,
    });
    setTimeout(() => {
      fetch(`http://localhost:8000/users/${decoded.id}`)
        .then((res) => res.json())
        .then((data) => setAdminData(data));
    }, 2000);
  };

  return (
    <div>
      <div className="">
        <h2 className="text-center mb-5 mt-5">Total Revenue</h2>
        <div className="featuredItem text-center w-25 mx-auto" style={{ cursor: "default" }}>
          <span className="featuredMoney text-center">
            {/* {loading ? (
                <ThreeDots
                  height="30"
                  width="40"
                  radius="9"
                  color="#0d6efd"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                coursesAmount
              )} */}
            {adminData.totalRevenue} $
          </span>
          <span className="featuredMoneyRate">
            <span className="featuredIcon negative" />
          </span>
        </div>
      </div>
      <h2 className="text-center mb-5 mt-5">All Users</h2>
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
                    className="btn btn-info text-white"
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
                    <button className="btn btn-danger" onClick={() => handleShowModal(course.name)}>
                      Delete course
                    </button>

                    <button
                      className="btn btn-info text-white"
                      onClick={() => handleOpenEditCourseModal(course.name, course.id)}
                    >
                      Edit course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        <div className="d-block">
          <div>
            <h2 className="fs-2 fw-bold text-center mt-5 mb-5">Page Visitors Analytics</h2>
            <div className="d-flex cursor-default">
              <div class="featuredItem cursor-none">
                <span class="featuredTitle">HOME PAGE VISITORS</span>
                <div class="featuredMoneyContainer">
                  <span class="featuredMoney">{visitorCount}</span>
                  <span class="featuredMoneyRate">
                    <span class="featuredIcon negative"></span>
                  </span>
                </div>
              </div>

              <div class="featuredItem cursor-none">
                <span class="featuredTitle">LEARNER DASHBOARD VISITORS</span>
                <div class="featuredMoneyContainer">
                  <span class="featuredMoney">{learnerCount}</span>
                  <span class="featuredMoneyRate">
                    <span class="featuredIcon negative"></span>
                  </span>
                </div>
              </div>
              <div class="featuredItem cursor-none">
                <span class="featuredTitle">CREATOR DASHBOARD VISITORS</span>
                <div class="featuredMoneyContainer">
                  <span class="featuredMoney">{creatorVisitorCount}</span>
                  <span class="featuredMoneyRate">
                    <span class="featuredIcon negative"></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-center fs-2 fw-bold mt-5 mb-5">Withdraw requests</p>
          {adminData.withdrawals && adminData.withdrawals.length === 0 && (
            <p className="text-center fs-3 text-primary">There are no withdraw requests</p>
          )}
          <div className="">
            <div className="d-flex cursor-default w-50 mx-auto">
              {adminData &&
                adminData.withdrawals &&
                adminData.withdrawals.map((data) => (
                  <div class="featuredItem cursor-none">
                    <span class="featuredTitle">
                      <span className="text-primary">{data.userName}</span> requested withdrawal -{" "}
                      {data.amount} $
                    </span>
                    <div class="featuredMoneyContainer">
                      <span class="creator-email fs-5">Email: {data.userEmail}</span>
                    </div>
                    <div class="featuredMoneyContainer">
                      <span class="creator-email fs-5">Card Number: {data.cardNumber}</span>
                    </div>
                    <div class="featuredMoneyContainer">
                      <span class="creator-email fs-5">Request issued on: {data.date}</span>
                    </div>

                    <div className="buttons d-flex">
                      <button
                        className="btn btn-success"
                        onClick={() => handleApprove(data.userEmail, data.amount)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "5%" }}
                        onClick={() => handleReject(data.userEmail, data.amount)}
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {showDeleteCourseModal && (
        <Modal
          title="Confirm Action"
          body={`Are you sure you want to delete course `}
          item={selectedCourse}
          onConfirm={() => handleConfirm(selectedCourse)}
          onCancel={handleCancel}
          delete
        />
      )}

      {showDeleteUserModal && (
        <Modal
          title="Confirm Action"
          body={`Are you sure you want to delete user `}
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
