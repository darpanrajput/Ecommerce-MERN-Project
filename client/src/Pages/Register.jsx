import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { register } from "../redux/apiCall";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(182, 239, 238, 0.5),
      rgba(190, 228, 236, 0.5)
    ),
    url("images/fashion.jpg");
  background-position: center;
  background-size: contain;
  /* background-repeat: no-repeat; */

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;

  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

export const Register = () => {
  const [user, setUser] = useState({});
  const p1 = useRef(null);
  const p2 = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleInput = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const registerUser = (e) => {
    e.preventDefault();
   // console.log(75, "Register", user);
   // console.log(76, "Register", p1.current.value !== p2.current.value);
   // console.log(77, "Register", p1 === null && p2 === null);
   // console.log(78, "Register", p1, p2);
   // console.log(76, "Register", p1.current.value, p2.current.value);

    if (
      (!p1.current.value && !p2.current.value) ||
      p1.current.value !== p2.current.value
    ) {
      alert("Please Check the password!");
      return;
    }

    toast.success("You are logged in!", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setTimeout(() => {
      register(dispatch, user);
      navigate("/", { replace: true });
    }, 3000);
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREAT AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" type="text" />
          <Input placeholder="Last name" type="text" />
          <Input
            placeholder="user name"
            name="username"
            onChange={handleInput}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            autoComplete="new-password"
            onChange={handleInput}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            autoComplete="new-password"
            onChange={handleInput}
            ref={p2}
          />
          <Input placeholder="Confirm Password" type="password" ref={p1} />

          <Agreement>
            By Creating this account , I consent to the proscessing of my
            personal data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={registerUser}>Create</Button>
        </Form>

        <ToastContainer
          position="bottom-center"
          theme="dark"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
    </Container>
  );
};
