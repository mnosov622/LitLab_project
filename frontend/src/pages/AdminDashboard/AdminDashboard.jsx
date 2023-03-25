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
  return (
    <div>
      <Topbar />
      <FeaturedInfo />
      {/* <Chart /> */}
      <Users />
      {/* <RecentUsers/> */}
      {/* <WidgetLg/>
        <WidgetSm/> */}
    </div>
  );
};

export default AdminDashboard;
