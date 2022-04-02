import Fastfood from "@mui/icons-material/Fastfood";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/authContext";
import { Alert, CircularProgress } from "@mui/material";

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

const Link = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

// const Error = styled.span`
//   color: red;
// `;

const Login = ({ offLogin, openRegister }) => {
  const { loginUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    message: "",
    show: false,
  });

  const [loading, setLoading] = useState(false);

  const OnChangeFormLogin = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const OnSubmitForm = async (e) => {
    e.preventDefault();
    const loginData = await loginUser(form);
    if (!loginData.success) {
      setAlert({
        message: loginData.message,
        show: true,
      });
      setLoading(false);
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 3000);
    } else {
      offLogin(false);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Wrapper>
        <OffBtn
          onClick={() => {
            offLogin(false);
          }}
        >
          <CloseIcon style={{ color: "red" }} />
        </OffBtn>
        <Content>
          <Title>
            <Fastfood style={{ fontSize: "30px" }} />
            DSR
          </Title>
          <Form onSubmit={OnSubmitForm}>
            <h4 style={{ textAlign: "center", width: "100%" }}>
              Great to have you back
            </h4>
            <Input
              name="username"
              placeholder="username"
              value={form.username}
              onChange={OnChangeFormLogin}
            />
            <Input
              name="password"
              placeholder="password"
              type="password"
              value={form.password}
              onChange={OnChangeFormLogin}
            />
            <Button
              type="submit"
              onClick={() => {
                setLoading(true);
              }}
            >
              LOGIN
            </Button>
            {/* {error && <Error>Something went wrong...</Error>} */}
            <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
            <Link
              onClick={() => {
                offLogin(false);
                openRegister(true);
              }}
            >
              CREATE A NEW ACCOUNT
            </Link>
            {alert.show ? (
              <Alert severity="error">{alert.message}</Alert>
            ) : null}
            {loading && (
              <CircularProgress
                style={{ margin: "auto", padding: "3px", color: "red" }}
              />
            )}
          </Form>
        </Content>
      </Wrapper>
    </Container>
  );
};

export default Login;
