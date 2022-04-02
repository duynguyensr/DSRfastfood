import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Banner = styled.div`
  height: 60vh;
  width: 100%;
  background-image: url("https://cdn.shopify.com/s/files/1/0414/0069/6999/files/breacrumb.jpg");
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h3`
  color: black;
  margin-bottom: 20px;
`;

const Des = styled.h6`
  color: black;
  font-size: 90%;
`;

const CartBanner = () => {
  return (
    <Banner>
      <Title>Cart</Title>
      <Des>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          Home
        </Link>{" "}
        {">"} Your Shopping Cart
      </Des>
    </Banner>
  );
};

export default CartBanner;
