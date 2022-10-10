import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCartProducts } from "../../redux/apiCall";
import { useDispatch } from "react-redux";
import "./success.css";
const Pay = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goToHome = async () => {
    navigate("/", { replace: true });
    deleteCartProducts(dispatch);
  };
  const Payment = () => {
    return (
      <div className="payment-success">
        <div className="card">
          <div className="wrapper">
            <h1 className="title">Success!</h1>
            <h1 className="subtitle">
              Your order has been <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; created!!!
            </h1>
            <img
              className="check-mark"
              src="images/check.png"
              alt="check-mark-img"
            />

            <button className="btn-continue" onClick={goToHome}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <Payment />;
};

export default Pay;
