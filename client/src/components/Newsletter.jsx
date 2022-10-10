import { Send } from "@material-ui/icons";
import React from "react";
import { mobile } from "../responsive";
import styled from "styled-components";

const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
  ${mobile({ fontSize: "45px" })}
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 24px;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center", fontSize: "10px" })}
`;
const InputConatiner = styled.div`
  background-color: white;
  width: 50%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "65%" })}
`;
const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;
const Button = styled.button`
  flex: 1;
  border: none;
  cursor: pointer;
  background-color: teal;
  color: white;
`;
export const Newsletter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>GET TIMELY UPDATES FROM YOUR FAVORITE PRODUCTS</Description>
      <InputConatiner>
        <Input placeholder="Your Email" />

        <Button>
          <Send />
        </Button>
      </InputConatiner>
    </Container>
  );
};
