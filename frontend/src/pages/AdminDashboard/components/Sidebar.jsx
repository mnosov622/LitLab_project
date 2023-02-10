import '../css/component/sidebar.css'
import { Link } from "react-router-dom";

/*import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@material-ui/icons";
import { Link } from "react-router-dom";*/

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <li className="sidebarIcon" />
              Home
            </li>
            </Link>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <li className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <li className="sidebarIcon" />
                Products
              </li>
            </Link>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Transactions
            </li>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Manage
            </li>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Analytics
            </li>
            <li className="sidebarListItem">
              <li className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;