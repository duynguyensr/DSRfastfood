import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Collections = styled.div`
  width: 100%;
  height: 65vh;
  background-image: url(${(prop) =>
    prop.id === 1
      ? "https://cdn.shopify.com/s/files/1/0414/0069/6999/files/banner-v1-2.jpg?v=1593074549"
      : "https://cdn.shopify.com/s/files/1/0414/0069/6999/files/banner-v1-1.jpg?v=1593074782"});
  background-size: cover;
  background-repeat: no-repeat;
  overflow: hidden;
  -webkit-transition: all 0.7s ease-in-out;
  background-size: 100%;
  position: relative;
  &:hover {
    background-size: 102%;
  }

  @media (max-width: 500px) {
    height: 40vh;
  }
`;

const Banner = styled.div`
  height: 30%;
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 15px;
`;

const Button = styled.div`
  width: 150px;
  height: 50px;
  background: white;
  border: 1px solid white;
  font-size: 17px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  color: Black;
  cursor: pointer;
  -webkit-transition: all 0.4s ease-in-out;
  &:hover {
    background: red;
    color: white;
  }
`;

const Collection = () => {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Collections id={1}>
            <Banner>
              <Title>Good price combos</Title>
              <Link
                to="/products"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Button>SHOP NOW</Button>
              </Link>
            </Banner>
          </Collections>
        </Grid>
        <Grid item xs={12} md={6}>
          <Collections id={2}>
            <Banner>
              <Title>COllection Pizza</Title>
              <Link
                to="/products"
                style={{ textDecoration: "inherit", color: "inherit" }}
              >
                <Button>SHOP NOW</Button>
              </Link>
            </Banner>
          </Collections>
        </Grid>
      </Grid>
    </div>
  );
};

export default Collection;
