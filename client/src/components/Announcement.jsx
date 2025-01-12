import styled from "styled-components";
import { COLORS } from "../colors/Colors.js";
import { mobile } from "../responsive";

//console.log(COLORS.primary);
const Container = styled.div`
  height: 30px;
  background-color: teal;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  margin-top: 10px;
  ${mobile({ marginTop: "0px" })}
`;
export const Announcement = () => {
  return <Container>Super Deal! Free shipping on oder above 50$</Container>;
};
