import { Visibility } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { userRequest } from "../../requestMethod";
import "./widgetSm.css";

const WidgetSm = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("user/findUsers?new=true");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  return (
    <div className="WidgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
          <li className="widgetSmListeItems" key={user._id}>
            <img
              src={
                user?.img ||
                "https://180dc.org/wp-content/uploads/2022/04/Blank-Avatar.png"
              }
              alt="p2"
              className="widgetSmImage"
            />
            <div className="widgetSmUser">
              <span className="widgetSmUserName">{user?.username}</span>
              <span className="widgetSmUserTitle">{user?.email}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetSm;
