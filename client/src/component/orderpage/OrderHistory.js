import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { apiURL } from "../../context/constant";
import SingleOrder from "./SingleOrder";

const Container = styled.div`
  width: 100%;
`;

const Wrapper = styled.div`
  margin: 50px 200px;
  align-items: center;
  @media (max-width: 1024px) {
    margin: 50px 10px;
  }
`;

const Title = styled.h3`
  margin-bottom: 30px;
  width: 200px;
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  font-family: Roboto;
  font-weight: 500;
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

const OrderHistory = () => {
  const [orderList, setOrderList] = useState([]);
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    const fetchOrder = async () => {
      if (authState.isAuthenticated) {
        try {
          const res = await axios.get(
            `${apiURL}/order/find/${authState.user._id}`
          );
          if (res.data.success) {
            setOrderList(res.data.orders.reverse());
          }
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchOrder();
  }, [authState]);

  return (
    <Container>
      <Wrapper>
        <Title>My History</Title>
        {orderList.length === 0 ? (
          <h4 style={{ fontFamily: "Poppins" }}>
            You don't have any history order
          </h4>
        ) : (
          <>
            <h4>Newest</h4>
            <SingleOrder orderInfo={orderList[0]} />
            {orderList.length > 1 ? (
              <>
                <h4>Old</h4>
                {orderList.slice(1).map((order) => (
                  <SingleOrder orderInfo={order} key={order._id} />
                ))}
              </>
            ) : null}
          </>
        )}

        <Link
          to="/products"
          style={{ textDecoration: "inherit", color: "inherit" }}
        >
          <Btn>CONTINUE SHOPPING</Btn>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default OrderHistory;
