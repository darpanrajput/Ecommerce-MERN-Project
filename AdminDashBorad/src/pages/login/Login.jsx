import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCall";
import "./login.css";
import { useSelector } from "react-redux";
const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { currentUser, isFetching, error } = useSelector((state) => state.user);
  const handleLogin = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div className="Login">
      <img src="/images/avatar.png" alt="profile" className="profile" />
      <input
        className="input"
        placeholder="username"
        type="text"
        onChange={(e) => setUserName(e.target.value)}
      />
      <input
        className="input"
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn-login" onClick={handleLogin} disabled={isFetching}>
        {isFetching ? "Loading..." : "LOG IN"}
      </button>
      {error && (
        <span style={{ color: "red" }}>
          Something Went Wrong !<br />
          Please try again(Clear Cache if you face the error)
        </span>
      )}

      {
        //check for currentUser if admin
        currentUser !== null && !currentUser.isAdmin && (
          <span style={{ color: "red" }}>
            You are not an admin!
            <br />
            Please Login Again!(Clear Cache if you face the error)
          </span>
        )
      }
    </div>
  );
};

export default Login;
