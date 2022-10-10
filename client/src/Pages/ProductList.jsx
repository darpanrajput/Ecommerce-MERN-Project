import React, { useState } from "react";
import styled from "styled-components";
import { Announcement } from "../components/Announcement";
import Footer from "../components/Footer";
import { Newsletter } from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { Navbar } from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
const Container = styled.div``;
const Title = styled.h1`
  margin: 20px;
`;
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  ${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
`;
const FilterText = styled.div`
  font-size: 20px;
  font-weight: 600;
  ${mobile({ fontSize: "15px" })}
`;

const Select = styled.select`
  padding: 10px;
  margin: 20px;

  ${mobile({ margin: "12px 0px", padding: "5px" })}
`;
const Option = styled.option``;



const ProductList = () => {
  const location = useLocation();
  const category = location.pathname.split('/')[2];
  // console.log(category)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const handleFilter = (e) => {
    const value = e.target.value;
    setFilters({ ...filters, [e.target.name]: value, })
  };
  // console.log(filter);
  // console.log(sort);


  return (
    <Container>
      <Announcement />

      <Navbar />

      <Title>{category}</Title>

      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilter}>
            <Option disabled>
              Color
            </Option>
            <Option>Multicolor</Option>
            <Option>Black</Option>
            <Option>White</Option>
            <Option>PinK</Option>
            <Option>Gery</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
            <Option>PistaGreen</Option>
            <Option>Maroon-Grey</Option>
            <Option>Navyblue-Red</Option>
            <Option>Red-Grey</Option>
            <Option>Orange-Black</Option>
          </Select>

          <Select name="size" onChange={handleFilter}>
            <Option disabled>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
            <Option>2XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e) => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price(Asc)</Option>
            <Option value="desc">Price(Desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters}
        cat={category}
        sort={sort}
      />
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default ProductList;
