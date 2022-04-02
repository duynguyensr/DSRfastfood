import { Grid, Alert } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Close from "@mui/icons-material/Close";
import { CartContext } from "../../context/cartContext";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
import CartCheckout from "./CartCheckout";
import Remove from "@mui/icons-material/Remove";
import Add from "@mui/icons-material/Add";

const Container = styled.div`
  width: 70%;
  margin: 100px auto;
  @media (max-width: 1024px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  padding: 20px 20px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 20px;
  position: relative;
`;

const DeleteIcon = styled.div`
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Image = styled.img`
  width: 80%;
  height: auto;
`;

const Name = styled.h4`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-family: Poppins;
  padding: 10px 10px;
  font-size: 130%;
`;

const Price = styled.h6`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff2f2f;
  font-weight: 600;
  font-family: Abel;
  font-size: 120%;
`;

const Total = styled.h4`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  color: #ff2f2f;
`;

const AmountContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin: 0px 10px;
`;

const Btn = styled.div`
  width: 300px;
  height: 60px;
  background: #ff2424;
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  position: relative;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.4s ease;
  &: hover {
    background: #008040;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const AlertContainer = styled.div`
  position: absolute;
  top: 5%;
  right: 0%;
  transform: translateX(110%);
  z-index: 100;
  width: 250px;
  @media (max-width: 600px) {
    bottom: 0%;
    left: 0%;
    transform: translateY(100%);
  }
`;

const CheckOut = styled.div`
  width: 100%;
  border: 0.5px solid lightgray;
  padding: 40px 40px;
  margin-top: 10vh;
`;

const WrapperCheckout = styled.div`
  width: 100%;
`;

const CheckOutTitle = styled.h6`
  height: 10vh;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid lightgray;
  font-weight: 600;
  font-family: Poppins;
  letter-spacing: 1.5px;
  font-size: 90%;
`;

const CheckOutBtn = styled.div`
  margin: 20px 0px;
  width: 300px;
  height: 60px;
  background: #1d1d1d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f4f4f4;
  font-weight: 600;
  letter-spacing: 1px;
  transition: all 0.4s ease;
  &: hover {
    background: #008040;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const CartItem = () => {
  const [alert, setShowAlert] = useState({
    message: "",
    type: "",
    success: false,
    show: false,
  });
  const { cartState, updateCart } = useContext(CartContext);
  const { authState } = useContext(AuthContext);
  const [cartProduct, setCartProduct] = useState([]);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCartProduct(cartState.products);
  }, [cartState]);

  const changeQuantity = async (id, type) => {
    if (type === "increase") {
      const temp = cartProduct.map((item) => {
        if (item.productId === id) ++item.quantity;
        return item;
      });
      setCartProduct(temp);
    } else {
      const temp = cartProduct.map((item) => {
        if (item.productId === id) {
          if (item.quantity > 1) --item.quantity;
        }
        return item;
      });
      setCartProduct(temp);
    }
  };

  const deleteCartProduct = (id_product) => {
    const arr = cartProduct.filter((item) => {
      return item.productId !== id_product;
    });
    setCartProduct(arr);
  };

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < cartProduct.length; i++) {
      total += cartProduct[i].price * cartProduct[i].quantity;
    }
    setTotal(total);
  }, [cartProduct]);

  return (
    <>
      <Container>
        {authState.isAuthenticated ? (
          cartProduct.length === 0 ? (
            <h5 style={{ marginLeft: "auto", marginRight: "auto" }}>
              You don't have any product in your cart ! Shop right now
            </h5>
          ) : (
            <Grid container spacing={4}>
              {cartProduct.map((product) => (
                <Grid item md={12} xs={12} key={product.productId}>
                  <Wrapper>
                    <DeleteIcon>
                      <Close
                        onClick={() => {
                          deleteCartProduct(product.productId);
                        }}
                      />
                    </DeleteIcon>
                    <Grid container spacing={1}>
                      <Grid item md={1.5} xs={6}>
                        <Image src={product.img}></Image>
                      </Grid>
                      <Grid item md={3.5} xs={6}>
                        <Name>{product.title}</Name>
                      </Grid>
                      <Grid item md={2} xs={6}>
                        <Price>{product.size}</Price>
                      </Grid>
                      <Grid item md={3} xs={6}>
                        <AmountContainer>
                          <Remove
                            onClick={() => {
                              changeQuantity(product.productId, "decrease");
                            }}
                          />
                          <Amount>{product.quantity}</Amount>
                          <Add
                            onClick={() => {
                              changeQuantity(product.productId, "increase");
                            }}
                          />
                        </AmountContainer>
                      </Grid>
                      <Grid item md={2} xs={12}>
                        <Total>
                          {(product.price * product.quantity).toFixed(2)}
                        </Total>
                      </Grid>
                    </Grid>
                  </Wrapper>
                </Grid>
              ))}
            </Grid>
          )
        ) : (
          <h5>You're not logged in. Please logged in to view your cart</h5>
        )}
        {/* <Btn
          onClick={() => {
            updateCart(cartProduct, authState.user._id);
          }}
        >
          Update cart
        </Btn> */}
        {authState.isAuthenticated ? (
          <Btn
            onClick={async () => {
              let res = await updateCart(cartProduct, authState.user._id);
              setShowAlert({ ...res, show: true });
              setTimeout(() => {
                setShowAlert({ ...alert, show: false });
              }, 2000);
            }}
          >
            UPDATE CART
            {alert.show ? (
              <AlertContainer>
                <Alert variant="filled" severity={alert.type}>
                  {alert.message}
                </Alert>
              </AlertContainer>
            ) : null}
          </Btn>
        ) : null}

        <Link
          to="/products"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <Btn>CONTINUE SHOPPING</Btn>
        </Link>

        <CheckOut>
          <WrapperCheckout>
            <Grid container spacing={1}>
              <Grid item md={12} xs={12}>
                <CheckOutTitle>CART TOTALS</CheckOutTitle>
              </Grid>
              <Grid item md={12} xs={12}>
                <Grid container spacing={1}>
                  <Grid item md={5} xs={5} style={{ fontWeight: "600" }}>
                    Total:
                  </Grid>
                  <Grid
                    item
                    md={7}
                    xs={7}
                    style={{ fontWeight: "bold", fontSize: "20px" }}
                  >
                    ${total.toFixed(2)}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item md={12} xs={12}>
                <CheckOutBtn onClick={() => setShowCheckOut(true)}>
                  PROCEED TO CHECKOUT
                </CheckOutBtn>
              </Grid>
            </Grid>
          </WrapperCheckout>
        </CheckOut>
      </Container>
      {showCheckOut ? (
        <CartCheckout
          offCheckOut={setShowCheckOut}
          products={cartProduct}
          total={total}
        />
      ) : null}
    </>
  );
};

export default CartItem;
