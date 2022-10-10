import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod";
import "./widgetLg.css";
import { format } from "timeago.js";

const Button = ({ type }) => {
  return <button className={"widgetLgButton " + type}>{type}</button>;
};
export const WidgetLg = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="WidgetLg">
      <h3 className="widgetLgTitle">Latest Transaction</h3>
      <table className="widgetsLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
          {orders.map((order) => (
            <tr className="widgetLgTr" key={order._id}>
              <td className="widgetLgUser">
                <img src="images/avatar.png" alt="" className="widgetLgImg" />
                <span className="widgeLgName">{order.userId}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">{`Rs ${order.amount}/-`}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
