import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./featuredInfo.css";
import { userRequest } from "../../requestMethod";
const FeaturedInfo = () => {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);

  const getIncome = async () => {
    try {
      const res = await userRequest.get("orders/income");
      setIncome(res.data);
      // console.log(res.data);
      if (res.data[1]) {
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);
      } else {
        setPerc(res.data[0].total / 100);
      }
    } catch (err) {
      console.log("FeaturedInfo_Err=>", err);
    }
  };

  useEffect(() => {
    getIncome();
  }, []);
  {
    // console.log("income->", income);
  }

  // console.log("perc->", perc);

  return (
    <div className="FeaturedInfo">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{`₹ ${
            income[1] ? income[1].total : income[0]?.total
          }`}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="arrowIcon Negative" />
            ) : (
              <ArrowUpward className="arrowIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compare To last Month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{`₹ ${income[0]?.total}`}</span>
          <span className="featuredMoneyRate">
            -11.00
            <ArrowDownward className="arrowIcon Negative" />
          </span>
        </div>
        <span className="featuredSub">Compare To last Month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">₹ 2,708</span>
          <span className="featuredMoneyRate">
            +26.00
            <ArrowUpward className="arrowIcon" />
          </span>
        </div>
        <span className="featuredSub">Compare To last Month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
