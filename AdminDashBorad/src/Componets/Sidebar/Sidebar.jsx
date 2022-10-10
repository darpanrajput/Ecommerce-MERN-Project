import React, { useContext } from "react";
import {
  AttachMoney,
  BarChart,
  ChatBubbleOutline,
  DynamicFeed,
  LineStyle,
  MailOutline,
  PermIdentity,
  Report,
  Storefront,
  Timeline,
  TrendingUp,
  WorkOutline,
} from "@material-ui/icons";
import "./sidebar.css";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/darkModeContext";

export const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="Link">
              <li className="sidebarListItem ">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>

            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>

            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              Sales
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="Link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/products" className="Link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>

            <li className="sidebarListItem">
              <AttachMoney className="sidebarIcon" />
              Transactions
            </li>

            <li className="sidebarListItem">
              <BarChart className="sidebarIcon" />
              Transactions
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notification</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>

            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              FeedBack
            </li>

            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Manage
            </li>

            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              Analytics
            </li>

            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Report
            </li>
          </ul>
        </div>
      </div>

      <div className="sidebarTheme">
        <h3 className="sidebarThemeTitle">Theme</h3>
        <div className="bottom">
          <div
            className="colorOption"
            style={{ backgroundColor: "whitesmoke" }}
            onClick={() => dispatch({ type: "LIGHT" })}></div>
          <div
            className="colorOption"
            style={{ backgroundColor: "#333" }}
            onClick={() => dispatch({ type: "DARK" })}></div>
        </div>
      </div>
    </div>
  );
};
