import React from "react";
import "./LearnerDashboard.scss";
import logo from "../../assets/logo.png";
import profile from "../../assets/influence-teacher.jpg";

const LearnerDashboard = () => {
  return (
    <div className="">
      <div className="h-100 side-menu position-absolute bottom-0 h-100">
        <div className="container d-flex flex-column align-items-center">
          <div className="">
            <img
              style={{ width: "40%", marginLeft: "33%" }}
              src={logo}
              alt="LitLab logo"
            />
          </div>
          <div className="nav d-flex flex-column mt-5 fs-4">
            <li className="mb-3">My courses</li>
            <li className="mb-3">My Cart</li>
            <li className="mb-3">Analytics</li>

            <div className="profile mt-5">
              <img className="rounded-circle w-25" src={profile} alt="" />
              <span className="profile-name">Mark</span>
            </div>
          </div>
        </div>
      </div>
      <div className="content pl-5 ">Main Content</div>
    </div>
  );
};

export default LearnerDashboard;
