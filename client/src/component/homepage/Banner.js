import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BannerContainer = styled.div`
  margin-top: 15vh;
  width: 100%;
  height: 70vh;
  background-image: url("https://cdn.shopify.com/s/files/1/0414/0069/6999/files/banner-v5.jpg?v=1593076405");
  background-position: center;
  background-size: 100%;
  position: relative;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-size: 110%;
  }
  @media (max-width: 720px) {
    height: 40vh;
    background-size: contain;
  }
`;

const BannerInfo = styled.div`
  width: 55%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fefcf9;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  opacity: 0.9;
  @media (max-width: 1024px) {
    width: 80%;
  }
`;

const BannerTitle = styled.h1`
  margin-top: 3vh;
  color: #f0002f;
  margin-left: auto;
  margin-right: auto;
  font-size: 80px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;

const BannerDes = styled.h4`
  margin-top: 3vh;
  font-weight: 700;
  letter-spacing: 3px;
  @media (max-width: 1024px) {
    margin-top: 1vh;
  }
`;

const BannerBtn = styled.div`
  width: 200px;
  height: 50px;
  color: white;
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  letter-spacing: 3px;
  position: absolute;
  left: 50%;
  bottom: -10%;
  transform: translateX(-50%);
  transition: all 0.4s ease;
  &:hover {
    background-color: #f0002f;
  }
`;

const Banner = () => {
  return (
    <>
      <BannerContainer>
        <BannerInfo>
          <BannerTitle>VEGGIE PIZZA</BannerTitle>
          <BannerDes>COLLECTION NEW</BannerDes>
          <Link
            to="/products"
            style={{ textDecoration: "inherit", color: "inherit" }}
          >
            <BannerBtn>SHOP NOW</BannerBtn>
          </Link>
        </BannerInfo>
      </BannerContainer>
    </>
  );
};

export default Banner;
