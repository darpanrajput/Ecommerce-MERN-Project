import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { Topbar } from "../../Componets/Topbar/Topbar";
import "./user.css";
export const User = () => {
  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">create</button>
            </Link>
          </div>

          <div className="userContainer">
            <div className="userShow">
              <div className="userTopContainer">
                <div className="userShowTop">
                  <img src="/images/avatar.png" alt="" className="userShowImg" />
                  <div className="userShowTopTitle">
                    <span className="userShowUserName">Anna Becker</span>
                    <span className="userShowUserTitle">Software Engineer</span>
                  </div>
                </div>
                <div className="userShowBottom">
                  <span className="userShowTitle">Account Details</span>

                  <div className="userShowInfo">
                    <PermIdentity className="userShowIcon" />
                    <span className="userShowInfoTitle">annabeck99</span>
                  </div>

                  <div className="userShowInfo">
                    <CalendarToday className="userShowIcon" />
                    <span className="userShowInfoTitle">10.10.1996</span>
                  </div>
                  <span className="userShowTitle">Contact Details</span>
                  <div className="userShowInfo">
                    <PhoneAndroid className="userShowIcon" />
                    <span className="userShowInfoTitle">73546446</span>
                  </div>

                  <div className="userShowInfo">
                    <MailOutline className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      xoxik42773@dilanfa.com
                    </span>
                  </div>

                  <div className="userShowInfo">
                    <LocationSearching className="userShowIcon" />
                    <span className="userShowInfoTitle">
                      D 66 1st Floor Sector 10 Delhi, Uttar Pradesh, 201301
                      951202444931
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>UserName</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      placeholder="annabeck99"
                    />
                  </div>

                  <div className="userUpdateItem">
                    <label>FullName</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      placeholder="Anna Beck"
                    />
                  </div>

                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      type="email"
                      className="userUpdateInput"
                      placeholder="xoxik42773@dilanfa.com"
                    />
                  </div>

                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input
                      type="number"
                      className="userUpdateInput"
                      placeholder="73546446"
                    />
                  </div>

                  <div className="userUpdateItem">
                    <label>Address</label>
                    <input
                      type="text"
                      className="userUpdateInput"
                      placeholder="D 66 1st Floor Sector 10 Delhi, Uttar Pradesh, 201301 951202444931"
                    />
                  </div>
                </div>

                <div className="userUpdateRight">
                  <div className="userUpdateUpload">
                    <img
                      src="/images/emmaStone.jpg"
                      alt="emmaStone.jpg"
                      className="userUpdateImg"
                    />

                    <label htmlFor="file">
                      <Publish className="userUpdateUploadIcon" />
                    </label>

                    <input type="file" id="file" className="userUpdateUploadImg" />
                  </div>
                  <button className="userUpdateButton">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div></div>

    </>
  );
};
