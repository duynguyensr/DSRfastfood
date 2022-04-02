import React, { useContext } from "react";
import styled from "styled-components";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlined from "@mui/icons-material/FavoriteBorderOutlined";
import { Grid } from "@mui/material";
import { ProductContext } from "../../context/productContext";
import { Link } from "react-router-dom";

const NewProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
`;
const ProductContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Product = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Name = styled.div`
  flex: 1;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Container = styled.div`
  flex: 2;
  margin: 5px;
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

  @media (max-width: 1024px) {
    width: 40vw;
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

const NewProduct = () => {
  const { productState, findProduct } = useContext(ProductContext);
  const newProduct = productState.products.slice(0, 8);
  return (
    <>
      <NewProductContainer>
        <Title>New Products</Title>
        <ProductContainer>
          <Grid container spacing={1}>
            {newProduct.map((item) => (
              <Grid item xs={6} md={3} key={item._id}>
                <Product>
                  <Container>
                    <Image src={item.img[0]} />
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
                    <Link
                      to={`/product/${item._id}`}
                      style={{ textDecoration: "inherit", color: "inherit" }}
                    >
                      <h4
                        style={{
                          marginTop: "5px",
                          fontFamily: "Poppins",
                          fontSize: "15px",
                        }}
                        onClick={() => {
                          findProduct(item._id);
                        }}
                      >
                        {item.title}
                      </h4>
                    </Link>
                    <p style={{ color: "red", fontWeight: "600" }}>
                      $ {item.price.toFixed(2)}
                    </p>
                  </Name>
                </Product>
              </Grid>
            ))}
          </Grid>
        </ProductContainer>
      </NewProductContainer>
    </>
  );
};

export default NewProduct;
