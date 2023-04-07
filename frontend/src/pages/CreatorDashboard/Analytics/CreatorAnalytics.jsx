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
import { Row, Col } from "react-bootstrap";

const enrollmentData = [
  { month: "Jan", enrolled: 50 },
  { month: "Feb", enrolled: 60 },
  { month: "Mar", enrolled: 55 },
  { month: "Apr", enrolled: 75 },
  { month: "May", enrolled: 90 },
  { month: "Jun", enrolled: 85 },
  { month: "Jul", enrolled: 80 },
  { month: "Aug", enrolled: 65 },
  { month: "Sep", enrolled: 70 },
  { month: "Oct", enrolled: 75 },
  { month: "Nov", enrolled: 60 },
  { month: "Dec", enrolled: 55 },
];

const earningsData = [
  { month: "Jan", earnings: 5000 },
  { month: "Feb", earnings: 6000 },
  { month: "Mar", earnings: 5500 },
  { month: "Apr", earnings: 7500 },
  { month: "May", earnings: 9000 },
  { month: "Jun", earnings: 8500 },
  { month: "Jul", earnings: 8000 },
  { month: "Aug", earnings: 6500 },
  { month: "Sep", earnings: 7000 },
  { month: "Oct", earnings: 7500 },
  { month: "Nov", earnings: 6000 },
  { month: "Dec", earnings: 5500 },
];

const enrolledUsersData = [
  {
    id: 1,
    name: "John Gill",
    email: "johngill@gmail.com",
    course: "React - The Complete Guide",
    image: "https://JavaScript-logo.png",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "janedoe@hotmail.com",
    course: "Javascript - From Zero to Hero",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bobsmith@yahoo.com",
    course: "Intermediate Python",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alicebrown@gmail.com",
    course: "Javascript - From Zero to Hero",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@gmail.com",
    course: "Advanced React Techniques",
  },
  {
    id: 4,
    name: "Sarah Thompson",
    email: "sarah.thompson@gmail.com",
    course: "React JS Fundamentals",
  },
  {
    id: 5,
    name: "Tom Wilson",
    email: "tom.wilson@hotmail.com",
    course: "React Native Development",
  },
];

const instructorReviews = [
  {
    name: "Bob Smith",
    review:
      "Intermediate Python is a great course for anyone looking to take their Python skills to the next level. The instructor is knowledgeable and provides clear explanations of the concepts. The course content is well-organized and covers a lot of ground, including object-oriented programming and data structures. However, I would have liked to see more hands-on exercises and projects to practice the concepts learned. Overall, a solid course for intermediate Python learners.",
    star: 5,
  },
  {
    name: "Alice Brown",
    review:
      "This course is the best resource for learning Javascript! The instructor is great at explaining complex topics in a simple and understandable way, and the course projects helped me apply my knowledge in real-world scenarios. Highly recommend to anyone looking to learn Javascript.",
    star: 3,
  },
  {
    name: "Tom Wilson",
    review:
      "I really enjoyed this course and learned a lot about React. The instructor was knowledgeable and patient, and the course projects were relevant and engaging. The only reason I didn't give it 5 stars is because I would have liked more opportunities to ask questions and get feedback on my work.",
    star: 4,
  },
  {
    name: "Mike Johnson",
    review:
      "I highly recommend this course to anyone looking to learn React. The instructor did an excellent job explaining complex concepts in a simple and easy-to-understand way. The course covers everything you need to know to get started with React, and the hands-on projects were especially helpful in solidifying my understanding of the material.",
    star: 5,
  },
];

const EnrollmentChart = () => {
  return (
    <BarChart
      width={650}
      height={350}
      data={enrollmentData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis type="number" />
      <Tooltip />
      <Legend />
      <Bar dataKey="enrolled" fill="#0d6efd" />
    </BarChart>
  );
};

const EarningsChart = () => {
  return (
    <BarChart
      width={650}
      height={350}
      data={earningsData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis type="number" />
      <Tooltip />
      <Legend />
      <Bar dataKey="earnings" fill="#0d6efd" />
    </BarChart>
  );
};

const Charts = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const userId = decoded.id;

  const [courses, setCourses] = useState([]);
  const [coursesLength, setCoursesLength] = useState([]);
  const [enrollmentsAmount, setEnrollmentsAmount] = useState(0);
  const [course, setCourse] = useState([]);
  const [userData, setUserData] = useState([]);

  //const [enrolledUsers, setEnrolledUsers]= useState([]);
  //const enrolledUsers = enrolledUsersData.filter(user => user.courseId === courseId);

  useEffect(() => {
    fetch(`https://litlab-backend.vercel.app/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses);
        setCoursesLength(data.courses.length);
        setUserData(data);
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
    </>
  );
};

export default Charts;
