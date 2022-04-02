import styled, { keyframes } from "styled-components";
import React, { useEffect } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { homePage, service } from "../data/homeData";
import { Grid } from "@mui/material";
import Collection from "../component/homepage/Collection";
import NewArrival from "../component/homepage/NewArrival";
import Banner from "../component/homepage/Banner";
import NewProduct from "../component/homepage/NewProduct";
import Instagram from "../component/homepage/Image";
import { Link } from "react-router-dom";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  position: relative;
  background: white;
  overflow: hidden;
`;

const Arrow = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(prop) => prop.direction === "left" && "10px"};
  right: ${(prop) => prop.direction === "right" && "10px"};
  cursor: pointer;
  margin: auto;
  opacity: 0.8;
`;

const ScaleImg = keyframes`
 
 0% { background-size: 100% 100%}
 50% { background-size: 105% 105% }
 100% {background-size: 100% 100%}
`;

const ImgContainer = styled.div`
  background-image: url(${(prop) => prop.src});
  height: 100vh;
  width: 100%;
  position: relative;
  @media (max-width: 1024px) {
    background-size: cover;
  }
  @media (min-width: 1024px) {
    animation-name: ${ScaleImg}};
  animation-duration: 8.5s;
  animation-iteration-count: infinite;
  }

  
`;

const TitleOpacity = keyframes`
 
 0% { margin-top: 60px; opacity: 0.4;}
 100% {margin-top: 0px; opacity: 1}
`;

const InfoContainer = styled.div`
  height: 30%;
  position: absolute;
  top: 50%;
  animation-name: ${TitleOpacity}};
  animation-duration: 2s;
  left: ${(prop) => prop.id === 1 && "10%"};
  right: ${(prop) => prop.id === 2 && "10%"};
  transform: translateY(-50%);
  color: white;
  text-align: ${(prop) => (prop.id === 1 ? "left" : "right")};
`;

const Title = styled.h3`
  font-family: Zen Old Mincho;
  margin-bottom: 10px;
  letter-space: 2px;
`;

const Description = styled.h1`
  font-family: Playfair Display;
  font-size: 8vh;
  margin-bottom: 40px;
  font-weight: 400;
  letter-space: 2px;
`;

const Button = styled.div`
  width: 150px;
  height: 50px;
  background: transparent;
  border: 1px solid white;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`;

const HomeInfo = styled.div`
  height: 40vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoImage = styled.img`
  width: 20%;
  height: auto;
  margin-bottom: 30px;
`;

const ServiceInfo = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
const InfoTitle = styled.h4`
  width: 90%;
  text-align: center;
`;

const InfoDes = styled.p`
  width: 90%;
  text-align: center;
  font-size: 90%;
`;

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Container>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-ride="carousel"
          style={{ width: "100vw" }}
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <ImgContainer src={homePage[0].src}>
                <InfoContainer id={homePage[0].id}>
                  <Title>{homePage[0].title}</Title>
                  <Description>{homePage[0].description}</Description>
                  <Link
                    to="/products"
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    <Button>Shop now</Button>
                  </Link>
                </InfoContainer>
              </ImgContainer>
            </div>
            <div className="carousel-item">
              <ImgContainer src={homePage[1].src}>
                <InfoContainer id={homePage[1].id}>
                  <Title>{homePage[1].title}</Title>
                  <Description>{homePage[1].description}</Description>
                  <Button>Shop now</Button>
                </InfoContainer>
              </ImgContainer>
            </div>
          </div>

          <a href="#carouselExampleIndicators" role="button" data-slide="next">
            <Arrow direction={"right"}>
              <ArrowForwardIosOutlinedIcon />
            </Arrow>
          </a>
          <a href="#carouselExampleIndicators" role="button" data-slide="prev">
            <Arrow direction={"left"}>
              <ArrowBackIosNewOutlinedIcon />
            </Arrow>
          </a>
        </div>
      </Container>
      <Grid container spacing={2}>
        {service.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <HomeInfo>
              <InfoImage src={item.src}></InfoImage>
              <ServiceInfo>
                <InfoTitle>{item.title}</InfoTitle>
                <InfoDes>{item.description}</InfoDes>
              </ServiceInfo>
            </HomeInfo>
          </Grid>
        ))}
      </Grid>
      <Collection />
      <NewArrival />
      <Banner />
      <NewProduct />
      <Instagram />
    </div>
  );
};

export default Home;
