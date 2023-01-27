import React from "react";
import "./LearnerDashboard.scss";
import logo from "../../assets/logo.png";
import profile from "../../assets/influence-teacher.jpg";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const LearnerDashboard = () => {
  return (
    <div className="">
      <div className="">
        <div className="container d-flex flex-column align-items-center">
          <div className="nav d-flex flex-column fs-4 ">
            {/* <div className="profile mt-5">
              <img
                className="rounded-circle w-25"
                src={profile}
                alt="Profile"
              />
              <span className="profile-name">Mark</span>
            </div> */}
          </div>
        </div>
      </div>
      <div className="">
        <div className="">Main Content</div>
      </div>
      <Outlet />
    </div>
  );
};

export default LearnerDashboard;
