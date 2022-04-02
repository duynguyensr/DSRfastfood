import { Alert } from "@mui/material";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";

const TextArea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 1.5px;
`;

const Button = styled.button`
  display: inline-flex;
  margin-right: 5px;
  align-items: center;
  justify-content: center;
  color: white;
  background: #f0002f;
  border-radius: 4px;
  width: 80px;
  font-size: 16px;
  font-weight: 400;
  font-family: Roboto, sans-serif;
  padding: 6px;
  border: none;
  transition: all 0.4s ease;
  &:hover {
    background: #111827;
  }
`;

const CommentForm = ({
  hasCancelButton,
  handleCancel,
  handleSubmit,
  parentId,
  setActive,
}) => {
  const id = useLocation().pathname.split("/")[2];
  const { authState } = useContext(AuthContext);
  const [alert, setAlert] = useState(false);
  const [text, setText] = useState("");
  //   const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    if (authState.user === null) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    } else {
      const data = {
        productId: `${id}`,
        userId: {
          _id: `${authState.user._id}`,
          username: `${authState.user.username}`,
        },
        desc: text,
        createdAt: "2022-02-09T09:33:34.745Z",
      };

      data.parentId = parentId ? parentId : undefined;
      handleSubmit(data);
      setActive(null);
      setText("");
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      style={{ marginBottom: "10px", position: "relative" }}
    >
      <TextArea value={text} onChange={(e) => setText(e.target.value)} />
      <Button className="comment-form-button" type="submit">
        Post
      </Button>
      {alert && (
        <Alert
          variant="filled"
          severity="warning"
          style={{
            width: "200px",
            position: "absolute",
            top: "7%",
            right: "0.5%",
          }}
        >
          You're not logged in!
        </Alert>
      )}
      {hasCancelButton && (
        <Button
          type="button"
          className="comment-form-button comment-form-cancel-button"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      )}
    </form>
  );
};

export default CommentForm;
