import React from "react";
import { useNavigate } from "react-router-dom";
import "./Success";

const Failed = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/cart", { replace: true });
  };
  const Payment = () => {
    return (
      <div className="payment-failed">
        <div className="card-failed">
          <div className="wrapper">
            <h1 className="title-failed">Failed!</h1>
            <h1 className="subtitle-failed">
              Sorry your order can't be
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Processed!!!
            </h1>
            <img
              className="check-mark"
              src="images/cross.png"
              alt="check-mark-img"
            />

            <button className="btn-continue-failed" onClick={goToHome}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  };
  return <Payment />;
};

export default Failed;
