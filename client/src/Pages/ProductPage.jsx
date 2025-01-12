import { Add, Remove } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import { mobile } from "../responsive";
import { Navbar } from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import { publicRequest } from "../requestMethod";
import { RUPEE, ONLY } from "../constant";
import { addProduct } from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;
const ImageContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: contain;
  ${mobile({ height: "35vh" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })}
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
  ${mobile({ fontSize: "30px" })}
`;

const FilterContainer = styled.div`
  width: 50%;
  display: flex;
  margin: 30px 0;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0 5px;
  cursor: pointer;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  align-items: center;
  ${mobile({ width: "100%" })}
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  cursor: pointer;
  background-color: white;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  // console.log("product_id=", id)
  const userId = useSelector((state) => state.cart.userId);
  // console.log("userId ", userId);
  const [product, setProduct] = useState({});
  const cartProducts = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        //setting default values
        setColor(res.data.color[0]);
        setSize(res.data.size[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") qty > 1 && setQty(qty - 1);
    else if (type === "inc") setQty(qty + 1);
  };

  const addToCart = (id) => {
    //CHECK IF THE PRODUCT IS ALREADY EXIST
    // console.log("add to cart id=>", id);
    if (
      cartProducts.length !== 0 &&
      cartProducts.findIndex((item) => item._id === id) !== -1
    ) {
      alert("item is already added");
      return;
    } else {
      dispatch(addProduct({ ...product, qty, color, size }));
    }
  };
  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper>
        <ImageContainer>
          <Image src={product.img} />
        </ImageContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>
            {" "}
            {RUPEE} {product.price}
            {ONLY}
          </Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product?.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={() => setColor(c)} />
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product?.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Add onClick={() => handleQuantity("inc")} />
              <Amount>{qty}</Amount>
              <Remove onClick={() => handleQuantity("dec")} />
            </AmountContainer>
            <Button onClick={() => addToCart(product._id)}>
              ADD ITEM TO CART
            </Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
