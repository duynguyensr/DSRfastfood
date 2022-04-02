import React from "react";
import styled from "styled-components";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { newArrival } from "../../data/homeData";

const ArrivalContainer = styled.div`
  margin-top: 50px;
  padding: 4px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;
const CarouselContainer = styled.div`
  width: 100%;
`;
const NewProduct = styled.div`
  height: auto;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-gap: 10px;
  @media (max-width: 400px) {
    grid-template-columns: auto auto;
  }
`;

const Product = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  width: 95%;
`;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  margin: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  z-index: 2;
  &:hover {
    transform: scale(1.1);
  }
`;

const IconInfo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const NewArrival = () => {
  return (
    <>
      <ArrivalContainer>
        <Title>New Arrivals</Title>
        <CarouselContainer>
          <NewProduct>
            {newArrival.slice(0, 4).map((item, index) => (
              <Product>
                <Container>
                  <Image src={item.src} />
                  <Info>
                    <IconInfo>
                      <ShoppingCartOutlined />
                    </IconInfo>
                    <IconInfo>
                      <SearchOutlined />
                    </IconInfo>
                    <IconInfo>
                      <FavoriteBorderOutlined />
                    </IconInfo>
                  </Info>
                </Container>
                <Name>
                  <h4
                    style={{
                      marginTop: "5px",
                      fontFamily: "Poppins",
                      fontSize: "110%",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      color: "red",
                      fontWeight: "600",
                      marginTop: "-11px",
                    }}
                  >
                    {item.price}
                  </p>
                </Name>
              </Product>
            ))}
          </NewProduct>
        </CarouselContainer>
      </ArrivalContainer>
    </>
  );
};

export default NewArrival;
