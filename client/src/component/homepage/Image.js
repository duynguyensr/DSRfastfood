import React from "react";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { image } from "../../data/homeData";

const InstagramContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  padding: 4px;
`;
const Title = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  transition: all 0.4s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;

const Instagram = () => {
  return (
    <>
      <InstagramContainer>
        <Title>Instagram</Title>
        <ImageContainer>
          <Grid container spacing={1}>
            {image.map((item) => (
              <Grid item xs={6} md={2.4} key={item.id}>
                <Wrapper>
                  <Image src={item.src}></Image>
                </Wrapper>
              </Grid>
            ))}
          </Grid>
        </ImageContainer>
      </InstagramContainer>
    </>
  );
};

export default Instagram;
