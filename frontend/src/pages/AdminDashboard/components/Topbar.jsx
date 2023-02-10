import React from "react";
import '../css/component/topbar.css'
// import "./topbar.css";
//import { NotificationsNone, Language, Settings } from "@material-ui/icons";

function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo"><b>LitLab Admin Dashboard</b></span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            
            <p><b>Olivia Jose</b></p>
          </div>
          <div className="topbarIconContainer">
           
            
          </div>
          <div className="topbarIconContainer">
            
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}

export default Topbar;