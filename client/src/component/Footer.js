import { Grid } from "@mui/material";
import React from "react";
import styled from "styled-components";
import Fastfood from "@mui/icons-material/Fastfood";

const Container = styled.div`
  margin-top: 10vh;
  background: #212121;
  color: white;
`;

const Content = styled.div`
  height: 40vh;
  width: 70%;
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  @media (max-width: 1024px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const Logo = styled.h2`
  font-weight: bold;
  font-family: Irish Grover;
  color: #dc2626;
  margin-bottom: 20px;
`;

const Des = styled.p`
  font-family: Poppins;
  font-size: 90%;
  font-weight: bold;
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Title = styled.h4`
  width: 70%;
  font-family: Abel;
  font-weight: bold;
  border-bottom: 0.5px solid lightgray;
`;

const List = styled.ul`
  margin-top: 15px;
`;

const ListItem = styled.li`
  list-style-type: none;
  margin-bottom: 10px;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    color: red;
  }
  @media (max-width: 1024px) {
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <div>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Content>
              <Logo>
                <Fastfood style={{ marginRight: "5px", fontSize: "100%" }} />
                <span>DSR</span>
              </Logo>
              <Des>Sophisticated simplicity for the independent mind.</Des>
            </Content>
          </Grid>
          <Grid item xs={12} md={3}>
            <Content>
              <Title>Help & Infomation</Title>
              <List>
                <ListItem>About Us</ListItem>
                <ListItem>Privacy Policy</ListItem>
                <ListItem>Terms & Conditions</ListItem>
                <ListItem>Products Return</ListItem>
                <ListItem>Wholesale Policy</ListItem>
              </List>
            </Content>
          </Grid>
          <Grid item xs={12} md={3}>
            <Content>
              <Title>About Us</Title>
              <List>
                <ListItem>Pagination</ListItem>
                <ListItem>Terms & Conditions</ListItem>
                <ListItem>Contact</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>Term of use</ListItem>
              </List>
            </Content>
          </Grid>
          <Grid item xs={12} md={3}>
            <Content>
              <Title>Categories</Title>
              <List>
                <ListItem>Help Center</ListItem>
                <ListItem>Address Store</ListItem>
                <ListItem>Privacy Policy</ListItem>
                <ListItem>Receivers & Amplifiers</ListItem>
                <ListItem>Clothings</ListItem>
              </List>
            </Content>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Footer;
