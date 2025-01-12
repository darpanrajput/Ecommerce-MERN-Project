import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import { Product } from "./Product";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Products = ({ cat, filters, sort }) => {
 // console.log(cat, filters, sort);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce-mern-project-e09o.onrender.com/api/products/findProducts?category=${cat}`
            : "https://ecommerce-mern-project-e09o.onrender.com/api/products/findProducts"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {



    cat &&
      setfilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);
  //console.log("filteredProducts:", filteredProducts);

  useEffect(() => {
    if (sort === "newest") {
      setfilteredProducts((p) =>
        [...p].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setfilteredProducts((p) => [...p].sort((a, b) => a.price - b.price));
    } else if (sort === "desc") {
      setfilteredProducts((p) => [...p].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  // prev=>[...prev].sort((a,b)=>a.createdAt - b.createdAt);

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product key={item._id} item={item} />
      )) : products.slice(0, 10).map((item) => (
        <Product key={item._id} item={item} />
      ))}
    </Container>
  );
};

export default Products;
