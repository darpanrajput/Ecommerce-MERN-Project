import React, { useState } from "react";
import Chart from "../../Componets/charts/Chart";
import FeaturedInfo from "../featureInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../Componets/WidgetSm/WidgetSm";
import { WidgetLg } from "../../Componets/WidgetLg/WidgetLg";
import { Sidebar } from "../../Componets/Sidebar/Sidebar";
import { Topbar } from "../../Componets/Topbar/Topbar";
import { useMemo } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethod";
const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("user/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };

    getStats();
  }, [MONTHS]);

  console.log("userStats->", userStats);
  return (
    <>
      <Topbar />
      <div className="Container">
        <Sidebar />
        <div className="home">
          <FeaturedInfo />
          <Chart
            data={userStats}
            title="User Analytics"
            grid
            dataKey="Active User"
          />
          <div className="homeWidget">
            <WidgetSm />
            <WidgetLg />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
