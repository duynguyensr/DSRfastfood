import Fastfood from "@mui/icons-material/Fastfood";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/authContext";
import { CartContext } from "../../context/cartContext";
import { Alert } from "@mui/material";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 30%;
  height: 70vh;
  border: 1px solid green;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  position: relative;
  @media (max-width: 1024px) {
    width: 100%;
    height: 100vh;
  }
`;

const OffBtn = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0%;
  right: 0%;
`;

const Content = styled.div`
  width: 90%;
  padding: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-item: center;
  justify-content: center;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  color: rgb(241 10 55);
  border-bottom: 0.5px solid lightgray;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 100%;
  border: none;
  padding: 15px 20px;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  transition: all 0.2s ease;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }

  &:hover {
    background-color: rgb(241 10 55);
  }
`;

// const Link = styled.a`
//   margin: 5px 0px;
//   font-size: 12px;
//   text-decoration: underline;
//   cursor: pointer;
// `;

// const Error = styled.span`
//   color: red;
// `;

const Register = ({ offRegister }) => {
  const { register } = useContext(AuthContext);
  const { createCart } = useContext(CartContext);
  const [alert, setAlert] = useState({
    message: "",
    show: false,
  });
  const [registerForm, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  const OnChangeForm = (e) => {
    setForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirm) {
      setAlert({
        message: "Passwords do not match",
        show: true,
      });
      setTimeout(() => {
        setAlert({ show: false });
      }, 3000);
      return;
    }
    try {
      const registerData = await register(registerForm);
      if (!registerData.success) {
        setAlert({
          message: registerData.message,
          show: true,
        });
        setTimeout(() => {
          setAlert({ show: false });
        }, 3000);
      }
      createCart(registerData.userId);
      offRegister(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Wrapper>
        <OffBtn
          onClick={() => {
            offRegister(false);
          }}
        >
          <CloseIcon style={{ color: "red" }} />
        </OffBtn>
        <Content>
          <Title>
            <Fastfood style={{ fontSize: "30px" }} />
            DSR
          </Title>
          <Form onSubmit={submitForm}>
            <h4 style={{ textAlign: "center", width: "100%" }}>
              Welcome to our service
            </h4>
            <Input
              name="username"
              placeholder="username"
              value={registerForm.username}
              onChange={OnChangeForm}
            />
            <Input
              name="email"
              placeholder="email"
              value={registerForm.email}
              onChange={OnChangeForm}
            />
            <Input
              name="password"
              placeholder="password"
              type="password"
              onChange={OnChangeForm}
            />
            <Input
              name="confirm"
              placeholder="confirm password"
              type="password"
              onChange={OnChangeForm}
            />
            <Button type="submit">REGISTER</Button>
            {alert.show ? (
              <Alert severity="error">{alert.message}</Alert>
            ) : null}
          </Form>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Register;
