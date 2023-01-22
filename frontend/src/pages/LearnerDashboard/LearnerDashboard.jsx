import React from "react";
import "./LearnerDashboard.scss";
import logo from "../../assets/logo.png";
import profile from "../../assets/influence-teacher.jpg";
import { Link, Outlet } from "react-router-dom";

const LearnerDashboard = () => {
  return (
    <div className="">
      <div className="h-100 side-menu position-absolute bottom-0 h-100">
        <div className="container d-flex flex-column align-items-center">
          <div
            className="nav d-flex flex-column fs-4 position-fixed"
            style={{ marginTop: "50%", bottom: "55%" }}
          >
            <Link to="/courses" className="mb-3 dashboard-item">
              My courses
            </Link>
            <Link to="/courses" className="mb-3 dashboard-item">
              My Cart
            </Link>
            <Link to="/courses" className="mb-3 dashboard-item">
              Analytics
            </Link>

            <div className="profile mt-5">
              <img
                className="rounded-circle w-25"
                src={profile}
                alt="Profile"
              />
              <span className="profile-name">Mark</span>
            </div>
          </div>
        </div>
      </div>
      <div className="position-absolute" style={{ left: "20%", top: "15%" }}>
        <div className="">Main Content</div>
      </div>
      <Outlet />
    </div>
  );
};

export default LearnerDashboard;
