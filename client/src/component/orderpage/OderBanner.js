import React from "react";
import styled from "styled-components";

const Banner = styled.div`
  height: 40vh;
  width: 100%;
  background-image: url("https://cdn.shopify.com/s/files/1/0414/0069/6999/files/dark.jpg?v=1592968208 ");
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  color: white;
`;

const Des = styled.h6`
  color: white;
`;
const OderBanner = () => {
  return (
    <Banner>
      <Title>Product</Title>
      <Des>Home {">"} Order</Des>
    </Banner>
  );
};

export default OderBanner;
