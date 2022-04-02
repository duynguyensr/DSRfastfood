import React, { useContext, useState } from "react";
import styled from "styled-components";
import Fastfood from "@mui/icons-material/Fastfood";
import AcountCircleRounded from "@mui/icons-material/AccountCircleRounded";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListIcon from "@mui/icons-material/List";
import Login from "./loginpage/Login";
import Register from "./loginpage/Register";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { Badge, Tooltip } from "@mui/material";
import { CartContext } from "../context/cartContext";

const Container = styled.div`
  height: 75px;
  background-color: #27241fbf;
  position: fixed;
  transition: all 0.4s ease;
  top: 0%;
  width: 100%;
  z-index: 999;
`;

const Wrapper = styled.div`
  height: 100%;
  padding: 10px 20px;
  display: flex;
  color: white;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const MenuItem = styled.h3`
  margin: 0 25px;
  font-family: Poppins;
  font-weight: 500;
  transition: all 0.5s ease;
  font-size: 110%;
  position: relative;
  padding: 3px;
  &:after {
    content: "";
    position: absolute;
    bottom: 0%;
    left: 0%;
    width: 0%;
    height: 2.2px;
    background: #dc2626;
    border-radius: 0.3px;
    transition: all 0.5s ease;
  }

  &:hover::after {
    color: rgb(240 7 53);
    width: 100%;
    border-bottom: 1px solid rgb(240 7 53);
  }

  &:hover {
    color: red;
  }
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-family: Irish Grover;
  @media (max-width: 1024px) {
    font-size: 120%;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Burger = styled.div`
  display: none;
  position: absolute;
  left: 5%;
  @media (max-width: 1024px) {
    display: block;
  }
`;

const Icon = styled.div`
  cursor: pointer;
  margin: 8px;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const Nav = () => {
  const { authState, logout } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const { cartState } = useContext(CartContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  var lastScrollTop = 0;

  // element should be replaced with the actual target element on which you have applied scroll, use window in case of no target element.
  window.addEventListener(
    "scroll",
    function () {
      // or window.addEventListener("scroll"....
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        document.querySelector(".NavBar").style.opacity = "0";
      } else {
        document.querySelector(".NavBar").style.opacity = "1";
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    },
    false
  );

  const History = useHistory();

  return (
    <>
      <Container className="NavBar">
        <Wrapper>
          <Left>
            <Link to="/" style={{ textDecoration: "inherit" }}>
              <MenuItem>HOME</MenuItem>
            </Link>
            <Link to="/products" style={{ textDecoration: "inherit" }}>
              <MenuItem>PRODUCTS</MenuItem>
            </Link>
            <MenuItem>NEWS</MenuItem>
            <MenuItem>ABOUT</MenuItem>
          </Left>
          <Center>
            <Burger>
              <ListIcon style={{ fontSize: "40" }} onClick={handleDrawerOpen} />
            </Burger>
            <Logo>
              <Fastfood style={{ marginRight: "5px", fontSize: "100%" }} />
              DSR
            </Logo>
          </Center>
          <Right>
            <Icon>
              {authState.isAuthenticated === false ? (
                <AcountCircleRounded
                  onClick={() => {
                    setLogin(!login);
                  }}
                />
              ) : (
                <Tooltip
                  title="Log out"
                  onClick={() => {
                    if (window.confirm("Do you want to log out ?")) {
                      logout();
                      History.push("/");
                    }
                  }}
                >
                  <AcountCircleRounded />
                </Tooltip>
              )}
            </Icon>
            <Link to="/order" style={{ textDecoration: "none" }}>
              <Icon>
                <ReceiptIcon />
              </Icon>
            </Link>
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <Icon>
                <Badge
                  badgeContent={
                    authState.isAuthenticated ? cartState.products.length : 0
                  }
                  color="primary"
                >
                  <ShoppingCartOutlinedIcon />
                </Badge>
              </Icon>
            </Link>
          </Right>
        </Wrapper>
        <Drawer
          sx={{
            width: "240px",
            flexShrink: 0,
            zIndex: 1251,
            "& .MuiDrawer-paper": {
              width: "240px",
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <ChevronLeftIcon
            onClick={handleDrawerClose}
            style={{ fontSize: "30px" }}
          />
          <List>
            <Link to={`/`}>
              <ListItem button key={1} onClick={handleDrawerClose}>
                <h4>Home</h4>
              </ListItem>
            </Link>
            <Link to={`/products`}>
              <ListItem button key={2} onClick={handleDrawerClose}>
                <h4>Products</h4>
              </ListItem>
            </Link>
            <Link to={`/`}>
              <ListItem button key={3} onClick={handleDrawerClose}>
                <h4>News</h4>
              </ListItem>
            </Link>
            <Link to={`/`}>
              <ListItem button key={4} onClick={handleDrawerClose}>
                <h4>About</h4>
              </ListItem>
            </Link>
          </List>
          <Divider />
          <List>
            <ListItem onClick={handleDrawerClose}>
              {/* <h3
                onClick={setLogin.bind(this, true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "70%",
                }}
              >
                <AcountCircleRounded />
                Acount
              </h3> */}
              {authState.isAuthenticated === false ? (
                <h3
                  onClick={setLogin.bind(this, true)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "70%",
                  }}
                >
                  <AcountCircleRounded />
                  Acount
                </h3>
              ) : (
                <h3
                  title="Log out"
                  onClick={() => {
                    if (window.confirm("Do you want to log out ?")) {
                      logout();
                      History.push("/");
                    }
                  }}
                >
                  <AcountCircleRounded />
                  Acount
                </h3>
              )}
            </ListItem>
            <Link to={"/order"}>
              <ListItem onClick={handleDrawerClose}>
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "70%",
                  }}
                >
                  <ReceiptIcon />
                  History
                </h3>
              </ListItem>
            </Link>
            <Link to={"/cart"}>
              <ListItem onClick={handleDrawerClose}>
                <h3
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    width: "70%",
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                  My Cart
                </h3>
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Drawer>
      </Container>
      {login && <Login offLogin={setLogin} openRegister={setRegister} />}
      {register && <Register offRegister={setRegister} />}
    </>
  );
};

export default Nav;
