import React from "react";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { Topbar } from "../../Componets/Topbar/Topbar";
import "./newUser.css";

export const NewUser = () => {
  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm">
            <div className="newUserFormItems">
              <div className="newUserFormItem">
                <label>User Name</label>
                <input type="text" placeholder="John.Smith567" />
              </div>
              <div className="newUserFormItem">
                <label>Fulll Name</label>
                <input type="text" placeholder="John Smith" />
              </div>

              <div className="newUserFormItem">
                <label>Email</label>
                <input type="email" placeholder="John.Smith567@outlook.com" />
              </div>

              <div className="newUserFormItem">
                <label>Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  placeholder="password"
                />
              </div>

              <div className="newUserFormItem">
                <label>Phone</label>
                <input type="phone" placeholder="+91 12235672" />
              </div>

              <div className="newUserFormItem">
                <label>Address</label>
                <input type="text" placeholder="Address" />
              </div>

              <div className="newUserFormItem">
                <label>Gender</label>
                <div className="newUserGender">
                  <input type="radio" name="gender" id="male" value="male" />
                  <label htmlFor="male">Male</label>

                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    value="female"
                  />
                  <label htmlFor="female">Female</label>

                  <input type="radio" name="gender" id="other" value="other" />
                  <label htmlFor="other">Other</label>
                </div>
              </div>
              <div className="newUserFormItem">
                <label>Active</label>
                <select className="newUserSelect" name="active" id="active">
                  <option value="yes" className="newUserOption">
                    Yes
                  </option>
                  <option value="no" className="newUserOption">
                    No
                  </option>
                </select>
              </div>
            </div>
            <button className="newUserFormButton">Create</button>
          </form>
        </div>
      </div>
    </>
  );
};
