import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "./Charts.css";
import image1 from "../../../assets/courseImage.jpg";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { useAlert, positions } from "react-alert";

const Charts = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;
  const alert = useAlert();

  const [courses, setCourses] = useState([]);
  const [coursesLength, setCoursesLength] = useState([]);
  const [enrollmentsAmount, setEnrollmentsAmount] = useState(0);
  const [course, setCourse] = useState([]);
  const [userData, setUserData] = useState([]);
  const [moneyEarned, setMoneyEarned] = useState(0);

  const [show, setShow] = useState(false);

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationDay, setExpirationDay] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleWithdraw = () => {
    if (
      cardHolderName &&
      cardNumber &&
      expirationMonth &&
      expirationDay &&
      expirationDay &&
      expirationYear &&
      cvv
    ) {
      setError(false);
      alert.success("We received your request to withdraw money", {
        position: positions.BOTTOM_RIGHT,
        timeout: 3000,
      });
      setTimeout(() => {
        handleClose();
      }, 3500);

      const date = new Date();
      const formattedDate = date.toISOString().substr(0, 10);

      const data = {
        cardNumber: cardNumber,
        cardHolderName: cardHolderName,
        expirationDay: expirationDay,
        expirationMonth: expirationMonth,
        expirationYear: expirationYear,
        amount: userData.moneyEarned,
        userEmail: userData.email,
        userName: userData.name,
        date: formattedDate,
      };

      fetch("https://litlab-backend.vercel.app/users/withdrawals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add withdrawal information");
          }
          console.log("Withdrawal information added successfully");
        })
        .catch((error) => {
          console.error(error);
        });

      return;
    }
    setError(true);
  };
  //const [enrolledUsers, setEnrolledUsers]= useState([]);
  //const enrolledUsers = enrolledUsersData.filter(user => user.courseId === courseId);

  useEffect(() => {
    fetch(`https://litlab-backend.vercel.app/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        setCoursesLength(data.courses.length);
        setUserData(data);
        setMoneyEarned(data.totalEnrollments);
        console.log(
          "courses enrollemtns",
          data.courses.map((course) => course.enrollments)
        );
        const enrollments = data.courses.map((course) => course.enrollments);
        const enrollmentsAmount = enrollments.reduce(
          (acc, val) => acc + val,
          0
        );
        console.log("Enrollment sum", enrollmentsAmount);
        setEnrollmentsAmount(enrollmentsAmount);
      });
  }, []);

  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleShowAllReviews = () => {
    setShowAllReviews(true);
  };

  const handleHideAllReviews = () => {
    setShowAllReviews(false);
  };

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-2">
        <p>My Analytics</p>
      </div>
      <div className="d-flex mb-3">
        <div className="featured mt-3">
          <div className="featuredItem">
            <span className="featuredTitle">Total Courses</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{coursesLength || 0}</span>
              <span className="featuredMoneyRate">
                <span className="featuredIcon negative" />
              </span>
            </div>
          </div>
        </div>
        <div className="featured mt-3">
          <div className="featuredItem">
            <span className="featuredTitle">Total Enrollments</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {userData?.totalEnrollments || 0}
              </span>
              <span className="featuredMoneyRate">
                <span className="featuredIcon negative" />
              </span>
            </div>
          </div>
        </div>
        <div className="featured mt-3">
          <div className="featuredItem">
            <span className="featuredTitle">Money Earned</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">
                {userData.moneyEarned || 0}$
              </span>
              <div className="ml-auto" style={{ marginLeft: "auto " }}>
                {userData.moneyEarned > 0 && (
                  <button
                    className="btn btn-success btn-md"
                    onClick={handleShow}
                  >
                    Withdraw
                  </button>
                )}
              </div>
              <span className="featuredMoneyRate">
                <span className="featuredIcon negative" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-center mb-5">Enrolled Users</h2>
        {userData?.usersEnrolled?.length > 0 && (
          <table className="table  table-light fs-5 border">
            <thead className="border">
              <tr className="text-dark">
                <th>Name</th>
                <th>Email</th>
                <th colSpan={2} className="text-center">
                  Course Enrolled
                </th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.usersEnrolled &&
                userData.usersEnrolled.length > 0 &&
                userData.usersEnrolled.map((user) => (
                  <tr key={user.id}>
                    <td className="text-dark">
                      {" "}
                      <i class="bi bi-person"></i> &nbsp; {user.userName}
                    </td>
                    <td className="text-dark">{user.userEmail}</td>
                    <td className="text-center">
                      <img
                        className="img-react"
                        src={`https://litlab-backend.vercel.app/images/${user.courseImage}`}
                        alt="courseimage"
                        width={100}
                      />
                      <span className="text-dark" style={{ marginLeft: "2%" }}>
                        {user.courseName}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
      {userData?.usersEnrolled?.length === 0 ||
        (!userData?.usersEnrolled && (
          <p className="fs-2 text-primary text-center mb-5 mt-5">
            No one is enrolled in your courses
          </p>
        ))}

      <div className="row mt-5">
        <h2 className="text-center mb-5">Reviews</h2>
        {userData?.reviews?.length > 0 && (
          <div className="mx-auto col-md-8">
            <Row>
              <Col>
                {userData &&
                  userData.reviews &&
                  userData.reviews
                    .slice(0, showAllReviews ? userData.reviews.length : 3)
                    .map((review) => (
                      <div
                        className="previous-reviews mb-3 p-3 position-relative"
                        key={review.id}
                      >
                        <span
                          className="text-muted position-absolute"
                          style={{ right: "15px", top: "15px" }}
                        >
                          {review.date}
                        </span>
                        <h4>{review.name}</h4>
                        <p>
                          Rating :{" "}
                          {Array.from({ length: review.star }, (_, i) => (
                            <span key={i}>⭐️</span>
                          ))}
                        </p>
                        <p>{review.review} </p>
                      </div>
                    ))}
                {!showAllReviews &&
                userData.reviews &&
                userData.reviews?.length > 3 ? (
                  <div className="text-center">
                    <button
                      onClick={handleShowAllReviews}
                      className="btn btn-primary mb-3 w-100"
                    >
                      Show more reviews
                    </button>
                  </div>
                ) : (
                  showAllReviews &&
                  userData.reviews &&
                  userData.reviews?.length > 3 && (
                    <div className="text-center">
                      <button
                        onClick={handleHideAllReviews}
                        className="btn btn-primary mb-3 w-100"
                      >
                        Hide reviews
                      </button>
                    </div>
                  )
                )}
              </Col>
            </Row>
          </div>
        )}

        {userData?.reviews?.length === 0 && (
          <p className="fs-2 text-primary text-center mb-5 mt-5">
            You don't have reviews yet
          </p>
        )}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Card Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="fw-bold fs-5">Withdraw {userData.moneyEarned} $</p>
          <Form>
            <Form.Group controlId="formCardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                className="mb-2"
                maxLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCardName">
              <Form.Label>Cardholder Name</Form.Label>
              <Form.Control
                value={cardHolderName}
                onChange={(e) => setCardHolderName(e.target.value)}
                type="text"
                placeholder="Enter cardholder name"
                className="mb-2"
              />
            </Form.Group>

            <Form.Group controlId="formExpirationDate">
              <Form.Label>Expiration Date</Form.Label>
              <div className="d-flex">
                <Form.Select
                  className="me-2 mb-2"
                  aria-label="Month"
                  value={expirationMonth}
                  onChange={(e) => setExpirationMonth(e.target.value)}
                >
                  <option>Month</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </Form.Select>

                <Form.Select
                  className="me-2 mb-2"
                  aria-label="Day"
                  value={expirationDay}
                  onChange={(e) => setExpirationDay(e.target.value)}
                >
                  <option>Day</option>
                  {[...Array(31)].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  aria-label="Year"
                  className="mb-2"
                  value={expirationYear}
                  onChange={(e) => setExpirationYear(e.target.value)}
                >
                  <option>Year</option>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={2023 + i}>
                      {2023 + i}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </Form.Group>

            <Form.Group controlId="formCVV">
              <Form.Label>CVV</Form.Label>
              <Form.Control
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                type="text"
                placeholder="CVV"
                className="w-25"
                maxLength={3}
              />
            </Form.Group>
          </Form>
          {error && <p className="text-danger mt-3">Please fill all fields</p>}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleWithdraw}>
            Withdraw
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Charts;
