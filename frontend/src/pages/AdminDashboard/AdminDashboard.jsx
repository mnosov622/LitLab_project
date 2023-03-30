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
      <h1>Home Page</h1>
      <p>Total visitors: {visitorCount}</p>
      </div>
    </div>
  );
};
export default AdminDashboard;
