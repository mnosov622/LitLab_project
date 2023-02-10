import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../css/component/chart.css";

const activeuser = [
  { month: "Jan", activeuser: 50 },
  { month: "Feb", activeuser: 60 },
  { month: "Mar", activeuser: 55 },
  { month: "Apr", activeuser: 75 },
  { month: "May", activeuser: 90 },
  { month: "Jun", activeuser: 85 },
  { month: "Jul", activeuser: 80 },
  { month: "Aug", activeuser: 65 },
  { month: "Sep", activeuser: 70 },
  { month: "Oct", activeuser: 75 },
  { month: "Nov", activeuser: 60 },
  { month: "Dec", activeuser: 55 },
];

const sale = [
  { month: "Jan", sale: 5000 },
  { month: "Feb", sale: 6000 },
  { month: "Mar", sale: 5500 },
  { month: "Apr", sale: 7500 },
  { month: "May", sale: 9000 },
  { month: "Jun", sale: 8500 },
  { month: "Jul", sale: 8000 },
  { month: "Aug", sale: 6500 },
  { month: "Sep", sale: 7000 },
  { month: "Oct", sale: 7500 },
  { month: "Nov", sale: 6000 },
  { month: "Dec", sale: 5500 },
];

const ActiveUser = () => {
  return (
    <BarChart
      width={650}
      height={350}
      data={activeuser}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis type="number" />
      <Tooltip />
      <Legend />
      <Bar dataKey="activeuser" fill="#0d6efd" />
    </BarChart>
  );
};

const Sales = () => {
  return (
    <BarChart
      width={650}
      height={350}
      data={sale}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis type="number" />
      <Tooltip />
      <Legend />
      <Bar dataKey="sale" fill="#0d6efd" />
    </BarChart>
  );
};

const Charts = () => {
  return (
    <>
      <p className="text-center fs-3 mt-3 mb-3">
        <b>Analytics</b>
      </p>
      <div className="charts-container mb-5">
        <ActiveUser />
        <Sales />
      </div>
    </>
  );
};

export default Charts;
