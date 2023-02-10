import React from "react";
import "../css/component/topbar.css";
// import "./topbar.css";
//import { NotificationsNone, Language, Settings } from "@material-ui/icons";

function Topbar() {
  return (
    <div className="topbar mt-3 mb-3">
      <div className="topbarWrapper d-flex justify-content-center">
        <div className="topLeft ">
          <span className="logo fs-2">
            <b>LitLab Admin Dashboard</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
