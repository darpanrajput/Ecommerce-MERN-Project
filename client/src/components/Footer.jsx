import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import { mobile } from "../responsive";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  background-color: red;
  height: 70vh;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: white;
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Logo = styled.h1`
  ${mobile({ fontSize: "24px" })}
`;
const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({ fontSize: "12px", margin: "12px 0px" })}
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #${(props) => props.color};
  margin-right: 20px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Center = styled.div`
  background-color: white;
  padding: 20px;
  flex: 1;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0px;
  padding: 0px;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;

  margin-bottom: 10px;
  cursor: pointer;
`;

const Right = styled.div`
  background-color: white;
  padding: 20px;
  flex: 1;
  ${mobile({ backgroundColor: "#eee", padding: "10px" })}
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${mobile({ fontSize: "13px" })}
`;
const Payment = styled.img`
  width: 50%;
  cursor: pointer;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>MY LOGO</Logo>
        <Desc>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum natus
          soluta eveniet asperiores facilis repellendus similique modi corporis
          quaerat officia.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Fashion</ListItem>
          <ListItem>Women Fashion</ListItem>
          <ListItem>Accessories</ListItem>

          <ListItem>My Account</ListItem>
          <ListItem>Whishlist</ListItem>
          <ListItem>order Tracking</ListItem>
          <ListItem>Terms and Conditions</ListItem>
        </List>
      </Center>

      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          C-35, Udyogpuram Industrial Estate, Partapur, Delhi Road Meerut, Uttar
          Pradesh, 250501 00121244111
        </ContactItem>

        <ContactItem>
          <Phone style={{ marginRight: "10px" }} />
          +91 123 456 678
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: "10px" }} />
          Contact@darpan.com
        </ContactItem>
        <Payment
          src="images/payment.png"
          alt="payment.jpg"
          style={{ marginRight: "10px" }}
        />
      </Right>
    </Container>
  );
};

export default Footer;
