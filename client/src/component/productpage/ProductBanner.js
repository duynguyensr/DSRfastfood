import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Banner = styled.div`
  height: 60vh;
  width: 100%;
  background-image: url("https://cdn.shopify.com/s/files/1/0414/0069/6999/files/dark.jpg?v=1592968208 ");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  color: white;
`;

const Des = styled.h6`
  color: white;
`;

const ProductBanner = () => {
  return (
    <Banner>
      <Title>Product</Title>
      <Des>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          Home
        </Link>{" "}
        {">"} Product
      </Des>
    </Banner>
  );
};

export default ProductBanner;
