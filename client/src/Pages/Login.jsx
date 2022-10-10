import React from "react";
import { mobile } from "../responsive";
import styled from "styled-components";
import { useState } from "react";
import { login } from "../redux/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(182, 239, 238, 0.5),
      rgba(190, 228, 236, 0.5)
    ),
    url("images/fashion.jpg");
  background-position: center;
  background-size: cover;
  /* background-repeat: no-repeat; */

  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
`;
const Span = styled.p`
  cursor: pointer;
  font-size: 13px;
  font-style: normal;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
  &:disabled {
    color: black;
    cursor: not-allowed;
  }
`;
const Link = styled.a`
  font-size: 12px;
  margin: 10px 0;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(username, password);
    login(dispatch, { username, password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            type="text"
            autoComplete="new-password"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleLogin} disabled={isFetching}>
            {isFetching ? "Loading..." : "LOG IN"}
          </Button>
          {error && <Error> Something Went Wrong</Error>}
          <Link>DON'T YOU REMEMBER THE PASSWORD?</Link>
          <Span
            onClick={(e) => {
              navigate("/register");
            }}
          >
            <u>CREATE A NEW ACCOUNT</u>
          </Span>
        </Form>
      </Wrapper>
    </Container>
  );
};
