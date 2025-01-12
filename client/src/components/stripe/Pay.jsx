import React from "react";
import styled from "styled-components";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  padding: 20px;
  background-color: skyblue;
  border: none;
  border-radius: 10px;
  color: black;
  cursor: pointer;
`;
const Pay = () => {
  const header = {
    "Content-Type": "application/json",
  };

  const checkout = () => {
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "https://ecommerce-mern-project-e09o.onrender.com/api/checkout/stripe-checkout-session",
          {
            items: [
              { id: 1, quantity: 3 },
              { id: 2, quantity: 1 },
            ],
          },
          header,

        );

        console.log(res);
        {
          res?.data.url ? (
            (window.location = res.data.url)
          ) : (
            <span>please wait loading data......</span>
          );
        }
      } catch (err) {
        console.error(err.response.data);
      }
    };
    makeRequest();
  };

  return (
    <Container>
      <Button onClick={() => checkout()}>Pay Amount</Button>
    </Container>
  );
};

export default Pay;
