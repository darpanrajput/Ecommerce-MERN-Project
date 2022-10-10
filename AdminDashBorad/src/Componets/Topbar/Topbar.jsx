import { Language, NotificationsNone, Settings } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./topbar.css";
import { logout } from "../../redux/apiCall";
import { useDispatch } from "react-redux";

export const Topbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const clickHandler = () => {
    console.log("logout initiated");

    logout(dispatch);
  };
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Admin</span>
          </Link>
        </div>
        <div className="topRight">
          {user && (
            <div className="topbarIconContainer" onClick={clickHandler}>
              <span>Logout</span>
            </div>
          )}
          <div className="topbarIconContainer">
            <NotificationsNone className="topbarIcon" />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language className="topbarIcon" />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings className="topbarIcon" />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <img
              src="/images/avatar.png"
              alt="topbarAvatar"
              className="topBarAvatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
