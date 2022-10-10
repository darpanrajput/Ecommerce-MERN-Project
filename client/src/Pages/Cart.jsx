import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { mobile } from "../responsive";
import { Navbar } from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { deleteProducts } from "../redux/apiCall";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Container = styled.div``;
const Wrapper = styled.div`
  ${mobile({ padding: "0px" })}
`;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
  margin-top: 20px;
  ${mobile({ marginTop: "10px", fontSize: "25px" })}
`;
const Top = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px", marginBottom: "10px" })}
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  margin: 0px 20px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type == "filled" ? "Black" : "transparent"};
  color: ${(props) => props.type == "filled" && "white"};
  ${mobile({ margin: "0px 10px " })}
`;

const RemoveButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  margin: 40px 20px;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type == "filled" ? "Black" : "transparent"};
  color: ${(props) => props.type == "filled" && "white"};
  ${mobile({ margin: "0px 10px " })}
`;

const TopTexts = styled.div`
  ${mobile({ display: "none " })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;
const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  ${mobile({ flexDirection: "column", padding: "0 10px" })}
`;
const Product = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetails = styled.div`
  display: flex;
  flex: 2;
`;
const Image = styled.img`
  width: 200px;
  object-fit: cover;
  ${mobile({ width: "100px" })}
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
`;
const ProductName = styled.span`
  margin: 5px 10px;
`;

const Color = styled.div`
  display: flex;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  margin: 5px 10px;
`;
const ProductID = styled.span`
  margin: 5px 10px;
`;
const ProductSize = styled.span`
  margin: 5px 10px;
`;

const ProductDescription = styled.p`
  margin: 5px 10px;
  font-weight: 300;
  font-size: 14px;
  text-overflow: ellipsis;
`;

const PriceDetails = styled.div`
  flex: 1;
`;
const Info = styled.div`
  flex: 3;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const ProductHRContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  padding: 0px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid teal;
  border-radius: 5px;
  ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styled.div`
  font-size: 25px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  ${mobile({ padding: "30px" })}
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
  ${mobile({ margin: "20px 0" })}
`;
const SummaryItemText = styled.span`
  ${mobile({ fontSize: "15px" })}
`;
const SummaryItemPrice = styled.span`
  ${mobile({ fontSize: "15px" })}
`;
const SummaryButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;

export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const header = {
    "Content-Type": "application/json",
  };

  const checkout = () => {
    console.log("user=>", user);
    if (!user) {
      alert("you are not logged in . please sign in first");
      return;
    }
    const makeRequest = async () => {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/checkout/stripe-checkout-session",
          {
            // items: [
            //   { id: 1, quantity: 3 },
            //   { id: 2, quantity: 1 },
            // ],

            items: cart.products,
            userId: user._id,
          },
          header
        );

        // console.log("stipe response=", res);
        // localStorage.setItem("stipe response=", JSON.stringify(res))

        {
          res?.data.url ? (
            (window.location = res.data.url)
          ) : (
            <span>please wait loading data......</span>
          );
        }
      } catch (err) {
        console.error(err);
      }
    };
    makeRequest();
  };

  const removeCartItem = (id) => {
    console.log("removed cart item id=>", id);
    deleteProducts(id, dispatch);
    toast("Item Removed", {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag (3)</TopText>
            <TopText>Your Whishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((prod) => (
              <ProductHRContainer key={prod._id}>
                <Product>
                  <ProductDetails>
                    <Image src={prod.img} />
                    <Details>
                      <ProductName>
                        <b>Product Name: </b>
                        {prod.title}
                      </ProductName>
                      <ProductID>
                        <b>Product ID: </b>
                        {prod._id}
                      </ProductID>
                      <Color>
                        <ProductColor color={prod.color} />
                      </Color>
                      <ProductSize>
                        <b>Size: </b>
                        {prod.size}
                      </ProductSize>
                      <ProductDescription>{prod.desc}</ProductDescription>
                    </Details>
                  </ProductDetails>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <Add />
                      <ProductAmount>{prod.qty} </ProductAmount>
                      <Remove />
                    </ProductAmountContainer>
                    <ProductPrice>
                      {`Rs ${prod.price * prod.qty}/-`}
                    </ProductPrice>
                    <RemoveButton onClick={() => removeCartItem(prod._id)}>
                      REMOVE
                    </RemoveButton>
                  </PriceDetails>
                </Product>
                <Hr />
              </ProductHRContainer>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>SubTotal</SummaryItemText>
              <SummaryItemPrice>{`Rs ${cart.total}/-`}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs 10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs -10</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>{`Rs ${cart.total}/-`}</SummaryItemPrice>
            </SummaryItem>
            <SummaryButton onClick={() => checkout()}>
              CHECKOUT NOW
            </SummaryButton>
          </Summary>
        </Bottom>
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Wrapper>
      <Footer />
    </Container>
  );
};
