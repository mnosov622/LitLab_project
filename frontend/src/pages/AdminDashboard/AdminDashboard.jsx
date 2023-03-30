import React from "react";
//import Sidebar from "./components/Sidebar";
import Chart from "./components/Chart";
import FeaturedInfo from "./components/FeaturedInfo";
import Topbar from "./components/Topbar";
import RecentUsers from "./components/RecentUsers";
import Users from "./components/Users";
//import WidgetLg from "./components/WidgetLg";
//import WidgetSm from "./components/WidgetSm";

const AdminDashboard = () => {
  const visitorCount = parseInt(localStorage.getItem('visitorCount')) || 0;
  const learnerCount = parseInt(localStorage.getItem("learnerCount")) || 0;
  const creatorVisitorCount = parseInt(localStorage.getItem("creatorVisitorCount")) || 0;
  return (
    <div>
      <Topbar />
      <FeaturedInfo />
      {/* <Chart /> */}
      <Users />
      {/* <RecentUsers/> */}
      {/* <WidgetLg/>
      <WidgetSm/> */}
  
      {/* Add another div here */}
      <div>
      <h1>Page Visitor Analytics</h1>
      <p>Home Page visitors: {visitorCount}</p>
      <p>Learner Dashboard visitors: {learnerCount}</p>
      <p>Content Creator Dashboard visitors: {creatorVisitorCount}</p>
      </div>
    </div>
  );
};
export default AdminDashboard;
