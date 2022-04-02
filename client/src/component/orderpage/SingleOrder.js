import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/styles";

const Container = styled.div`
  width: 100%;
  height: auto;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px,
    rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;
  font-family: Roboto;
  border-radius: 5px;
  padding-bottom: 15px;
  margin-bottom: 40px;
  @media (max-width: 1024px) {
    padding-bottom: 20px;
  }
`;

const Title = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  border-top-radius: 5px;
  align-items: center;
  padding: 20px 15px;
  background-color: hsl(30deg 10% 96%);
`;

const Name = styled.span`
  font-weight: 500;
  color: #454545;
`;

const Total = styled.h4`
  color: hsl(0, 100%, 60%);
`;

const Content = styled.div`
  height: 80%;
`;

const Info = styled.div`
  width: 100%;
  height: auto;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: flex-start;
`;

const Header = styled.h4`
  margin-top: 20px;
  margin-left: 15px;
  font-family: Poppins;
  color: #494949;
  @media (max-width: 1024px) {
    margin-top: 10px;
  }
`;

const ProductsList = styled.div`
  margin-top: 15px;
  @media (max-width: 1024px) {
    margin-top: 10px;
  }
`;

const Item = styled.li`
  margin-left: 0px;
  font-weight: 300;
  color: #616161;
`;

const ItemProduct = styled.li`
  margin-left: 12px;
  font-weight: 400;
  color: #616161;
`;

const SingleOrder = ({ orderInfo }) => {
  const useStyles = makeStyles(() => ({
    root: {
      "& .Mui-active": { color: "hsl(187, 52%, 55%)" },
      "& .Mui-completed": { color: "hsl(187, 52%, 45%)" },
      "& .Mui-disabled ": { color: "gray" },
    },
  }));
  const c = useStyles();

  return (
    <Container>
      <Title>
        <Name>Order ID: {orderInfo._id}</Name>
        <Total>${orderInfo.total.toFixed(2)}</Total>
      </Title>
      <Content>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Header style={{ color: "hsl(1deg 99% 64%)" }}>Products</Header>
            <Info>
              <ProductsList>
                <ol>
                  {orderInfo.products.map((product) => (
                    <ItemProduct key={product.productId}>
                      {product.title} (qty: {product.quantity}, size:{" "}
                      {product.size})
                    </ItemProduct>
                  ))}
                </ol>
              </ProductsList>
            </Info>
          </Grid>
          <Grid item md={4} xs={12}>
            <Header>Shipping Info</Header>
            <Info>
              <ProductsList>
                <ul
                  style={{
                    listStyleType: "none",
                    paddingLeft: "0",
                    listStylePosition: "inside",
                  }}
                >
                  <Item>{orderInfo.name}</Item>
                  <Item>{orderInfo.phone}</Item>
                  <Item>{orderInfo.address}</Item>
                </ul>
              </ProductsList>
            </Info>
          </Grid>
          <Grid item md={4} xs={12}>
            <Header>Order Status</Header>
            <Info>
              <ProductsList>
                <Stepper
                  className={c.root}
                  alternativeLabel
                  activeStep={
                    orderInfo.status === "pending"
                      ? 1
                      : orderInfo.status === "shipped"
                      ? 2
                      : 3
                  }
                  style={{ marginLeft: "-40px" }}
                >
                  {["Confirmed", "Shipped", "Delivered"].map((item) => (
                    <Step key={item}>
                      <StepLabel>{item}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </ProductsList>
            </Info>
          </Grid>
        </Grid>
      </Content>
    </Container>
  );
};

export default SingleOrder;
