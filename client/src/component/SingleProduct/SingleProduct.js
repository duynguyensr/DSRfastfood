import { Grid, Alert } from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import axios from "axios";
import { apiURL } from "../../context/constant";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/authContext";
import Comments from "./Comments";

const Container = styled.div`
  margin-top: 0;
  width: 100%;
  padding-bottom: 20px;
`;

const MainImage = styled.img`
  width: 100%;
  height: auto;
`;

const Wrapper = styled.div`
  width: 90%;
  margin: 100px auto 0px auto;
`;

const ExtraImage = styled.img`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-around;
`;

const Name = styled.div`
  width: 100%;
  height: 15%;
  padding-bottom: 50px;
  border-bottom: 0.5px solid lightgray;
`;

const Title = styled.h3`
  font-family: Roboto;
`;
const Price = styled.h5`
  color: red;
`;

const Des = styled.p`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  font-family: Poppins;
  font-weight: 500;
  font-size: 90%;
  color: #b63033;
  line-height: 28px;
`;

const Btn = styled.div`
  width: 100%;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 70%;
  position: relative;
  @media (max-width: 1024px) {
    width: 100%;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 8px;
`;

const Button = styled.button`
  width: 200px;
  padding: 15px;
  border: none;
  background-color: #f0002f;
  color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: black;
  }
  margin-left: 50px;
`;

const AlertContainer = styled.div`
  position: absolute;
  top: -20%;
  right: 0%;
  transform: translateY(-100%);
  z-index: 100;
  width: 250px;
`;

const Info = styled.div`
  width: 100%;
  border: 0.5px solid lightgray;
  transition: all 0.7s ease;
  &:hover {
    border: 0.5px solid black;
  }
  padding: 10px 10px;
`;

const InfoTitle = styled.h5`
  width: 100%;
  text-align: center;
  position: relative;
  padding: 18px 10px;
  &::after {
    content: "";
    height: 1px;
    width: 50px;
    position: absolute;
    background: black;
    bottom: 0%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const InfoDes = styled.p`
  margin-top: 20px;
  width: 100%;
  font-size: 90%;
  text-align: center;
  color: #a0a0a0;
  font-family: Abel;
`;

const Banner = styled.div`
  width: 100%;
  margin-top: 50px;
`;

const ImageBanner = styled.img`
  width: 100%;
`;
const SingleProduct = () => {
  const { addProduct } = useContext(CartContext);
  const { authState } = useContext(AuthContext);
  const id = useLocation().pathname.split("/")[2];
  const [alert, setShowAlert] = useState({
    message: "",
    type: "",
    success: false,
    show: false,
  });
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    img: [],
    categories: [],
    size: [],
    price: 0,
  });

  const [productOption, setProductOption] = useState({
    size: "small",
    quantity: 1,
  });

  const setSize = (e) => {
    setProductOption({ ...productOption, size: `${e.target.value}` });
  };

  const changeQuantity = (type) => {
    if (type === "increase")
      setProductOption({
        ...productOption,
        quantity: ++productOption.quantity,
      });
    else {
      if (productOption.quantity === 1) return;
      else
        setProductOption({
          ...productOption,
          quantity: --productOption.quantity,
        });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      window.scrollTo(0, 0);
      try {
        const res = await axios.get(`${apiURL}/product/find/${id}`);
        if (res.data.success) {
          await setProduct(res.data.productInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <Container>
      <Wrapper>
        <Grid container spacing={1}>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={5}>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <MainImage
                      src={
                        productOption.size === "small"
                          ? product.img[0]
                          : productOption.size === "medium"
                          ? product.img[1]
                          : product.img[2]
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Grid container spacing={1}>
                      {product.img.map((item) => {
                        return (
                          <Grid item xs={4} md={4} key={item}>
                            <ExtraImage src={item} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={7}>
                <Content>
                  <Name>
                    <Title>{product.title}</Title>
                    <Price>${product.price.toFixed(2)} USD</Price>
                  </Name>
                  <Des>{product.desc}</Des>
                  <Btn>
                    <FilterContainer>
                      <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange={setSize}>
                          {product.size.map((item) => (
                            <FilterSizeOption
                              key={item}
                              value={item}
                              onClick={() => {
                                setSize(item);
                              }}
                            >
                              {item}
                            </FilterSizeOption>
                          ))}
                        </FilterSize>
                      </Filter>
                    </FilterContainer>
                    <AddContainer>
                      <AmountContainer>
                        <Remove
                          onClick={() => {
                            changeQuantity("decrease");
                          }}
                        />
                        <Amount>{productOption.quantity}</Amount>
                        <Add
                          onClick={() => {
                            changeQuantity("increase");
                          }}
                        />
                      </AmountContainer>
                      <Button
                        onClick={async () => {
                          if (authState.isAuthenticated) {
                            let res = await addProduct(
                              {
                                productId: product._id,
                                title: product.title,
                                price: product.price,
                                size: productOption.size,
                                img:
                                  productOption.size === "small"
                                    ? product.img[0]
                                    : productOption.size === "medium"
                                    ? product.img[1]
                                    : product.img[2],
                                quantity: productOption.quantity,
                              },
                              `${authState.user._id}`
                            );
                            setShowAlert({ ...res, show: true });
                            setTimeout(() => {
                              setShowAlert({ ...alert, show: false });
                            }, 2000);
                          } else {
                            setShowAlert({
                              message: "You're not logged in",
                              type: "warning",
                              show: true,
                            });
                            setTimeout(() => {
                              setShowAlert({ ...alert, show: false });
                            }, 2000);
                          }
                        }}
                      >
                        ADD TO CART
                      </Button>
                      {alert.show ? (
                        <AlertContainer>
                          <Alert variant="filled" severity={alert.type}>
                            {alert.message}
                          </Alert>
                        </AlertContainer>
                      ) : null}
                    </AddContainer>
                  </Btn>
                </Content>
              </Grid>
            </Grid>
            <Comments />
          </Grid>
          <Grid item xs={12} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Info>
                  <InfoTitle>Shipping</InfoTitle>
                  <InfoDes>
                    Free if stated near price. $9.95 Australia wide (up to 10
                    items). $18.95 for Express Post (generally 1 business day).
                  </InfoDes>
                </Info>
              </Grid>
              <Grid item xs={12} md={12}>
                <Info>
                  <InfoTitle>Why Choose Us ?</InfoTitle>
                  <InfoDes>
                    Official Herschel stockist Australian warranty assistance &
                    support Australian shipping & returns.Customer first
                    experience environmentally focused
                  </InfoDes>
                </Info>
              </Grid>
              <Grid item xs={12} md={12}>
                <Info>
                  <InfoTitle>Returns</InfoTitle>
                  <InfoDes>
                    Return this product within 100 days if you change your mind.
                    Get a refund/replacement & free return shipping if it
                    arrives damaged or not as described
                  </InfoDes>
                </Info>
              </Grid>
            </Grid>
            <Banner>
              <ImageBanner
                alt="test"
                src="https://cdn.shopify.com/s/files/1/0414/0069/6999/files/sidebar_banner.jpg?v=1592968206"
              />
            </Banner>
          </Grid>
        </Grid>
      </Wrapper>
    </Container>
  );
};

export default SingleProduct;
