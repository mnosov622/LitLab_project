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

  useEffect(() => {
    fetch(`http://localhost:8000/users/${userId}`)
    .then(res => res.json())
    .then(data => {setCourses(data.courses); setCoursesLength(data.courses.length); 
      
      console.log(data.courses.map(course => course.enrollments));
      const enrollemnts = data.courses.map(course => course.enrollments);
      const enrollmentsAmount = enrollemnts.reduce((acc, val) => acc + val, 0);
      console.log("Endollments sum", enrollmentsAmount);
      setEnrollmentsAmount(enrollmentsAmount);
    })
  }, []);

  return (
    <>
      <div className="bg-light shadow text-center p-2 fs-2 mb-5">
        <p>My Analytics</p>
      </div>
      <div className="mb-5 row text-center">
        <div className="col-md-6 ml-auto">
          <h3>Total courses: {coursesLength}</h3>
        </div>
        <div className="col-md-6">
          <h3>Total enrollments: {enrollmentsAmount}</h3>
        </div>
      </div>
      <div className="charts-container mb-5">
        <EnrollmentChart />
        <EarningsChart />
      </div>
    </>
  );
};

export default Charts;
