import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Razorpay from "razorpay";
const util = require("util");
const Heading = styled.h1``;
const Container = styled.div``;
const Heading2 = styled.h2``;
const ListOrder = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Table = styled.table``;
const TableHeader = styled.thead``;
const Row = styled.tr``;
const TableHeading = styled.th``;
const TableBody = styled.tbody``;
const TableData = styled.td``;
const Lable = styled.label``;
const Input = styled.input``;
const Button = styled.button``;

const RazorPayPayment = () => {
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [orders, setOrders] = useState([]);

  // FETCH THE ORDER FROM MONGO DB IF ANY
  async function fetchOrders() {
    const { data } = await axios.get(
      "https://ecommerce-mern-project-e09o.onrender.com/api/payment/list-orders"
    );
    setOrders(data);
  }

  // FETCH OLD STORED ORDER FROM DB WHEN THE APP RUNS FIRST
  useEffect(() => {
    console.log("USE-EFFECT-CALLED");
    fetchOrders();
  }, []);

  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        console.log("loading=" + loading);
        const result = await axios.post(
          "https://ecommerce-mern-project-e09o.onrender.com/api/payment/create-order",
          {
            amount: orderAmount + "00",
          }
        );
        console.log(
          util.inspect(result, { showHidden: false, depth: null, colors: true })
        );
        console.log("response from rxpay=" + result.data);
        // STORE THE DATA INTO A FILE
        // require("fs").fs.writeFileSync("Result.json", JSON.stringify(result));
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(
          "https://ecommerce-mern-project-e09o.onrender.com/api/payment/get-razorpay-key"
        );
        //STORE RESULT INTO A JSON FILE
        // require("fs").fs.writeFileSync(
        //   "Data.json",
        //   JSON.stringify(result.data)
        // );

        const __DEV__ = document.domain === "localhost";

        console.log("key id=" + __DEV__ ? razorpayKey : "PRODUCTION_KEY");
        const options = {
          key: __DEV__ ? razorpayKey : "PRODUCTION_KEY",
          amount: amount.toString(),
          currency: currency,
          name: "Donations",
          description: "Thank you for your payment",
          image: "https://cdn.logo.com/hotlink-ok/logo-social.png",
          order_id: order_id,
          handler: async function (response) {
            //called after successful payment
            console.log(
              "handler response=" +
                util.inspect(response, {
                  showHidden: false,
                  depth: null,
                  colors: true,
                })
            );

            const result = await axios.post(
              "https://ecommerce-mern-project-e09o.onrender.com/api/payment/pay-order",
              {
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              }
            );
            ///payment succeeded
            alert(result.data.msg);

            fetchOrders();
          },
          prefill: {
            name: "Darpan Rajput",
            email: "darpanrajput412@gmail.com",
            contact: "111111111",
          },
          notes: {
            address: "New Delhi",
            productItem: "Tea Bag",
          },
          theme: {
            color: "#80c0f0",
          },
        };

        setLoading(false);
        console.log("loading=" + loading);

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.log(error);
        alert(error);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  return (
    <Container>
      <Heading> Razorpay Example: Node & React</Heading>
      <hr />
      <Container>
        <Heading2> Pay Order</Heading2>
        <Lable>
          Amount:
          <Input
            placeholder="INR"
            type="number"
            value={orderAmount}
            onChange={(e) => setOrderAmount(e.target.value)}></Input>
        </Lable>

        <Button disabled={loading} onClick={loadRazorpay}>
          Razorpay
        </Button>
        {loading && <div>Loading...</div>}
      </Container>
      <ListOrder className="list-orders">
        <Heading2>List Orders</Heading2>
        <Table>
          <TableBody>
            <Row>
              <TableHeading>ID</TableHeading>
              <TableHeading>AMOUNT</TableHeading>
              <TableHeading>ISPAID</TableHeading>
              <TableHeading>RAZORPAY</TableHeading>
            </Row>

            {orders.map((x) => (
              <Row key={x._id}>
                <TableData>{x._id}</TableData>
                <TableData>{x.amount / 100}</TableData>
                <TableData>{x.isPaid ? "YES" : "NO"}</TableData>
                <TableData>{x.razorpay.paymentId}</TableData>
              </Row>
            ))}
          </TableBody>
        </Table>
      </ListOrder>
    </Container>
  );
};

export default RazorPayPayment;
