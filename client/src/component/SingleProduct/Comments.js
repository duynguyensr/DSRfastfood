import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../context/authContext";
import { apiURL } from "../../context/constant";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

const CommentsContainer = styled.div`
  margin: 50px 0px;
`;
const Comments = () => {
  const id = useLocation().pathname.split("/")[2];
  const { authState } = useContext(AuthContext);
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === undefined
  );

  console.log(backendComments);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiURL}/product/comment/${id}`);
        if (res.data.success) {
          setBackendComments(
            res.data.comments.sort(
              (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const addComment = async (commentData) => {
    try {
      const res = await axios.post(`${apiURL}/product/comment`, commentData);
      if (res.data.success) {
        setBackendComments([
          {
            ...res.data.commentInfo,
            userId: {
              _id: authState.user._id,
              username: authState.user.username,
            },
          },
          ...backendComments,
        ]);
        console.log(backendComments);
      } else {
        console.log("cant add new comment");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      try {
        const res = await axios.delete(
          `${apiURL}/product/comment/${authState.user._id}/${commentId}`
        );
        if (res.data.success) {
          const newData = backendComments.filter(
            (comment) => comment._id !== commentId
          );
          setBackendComments(newData);
        } else {
          console.log("cant delete this comment");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <CommentsContainer>
      <h3>Feedback ({backendComments.length})</h3>
      <div style={{ marginBottom: "5px" }}>Write a comment</div>
      <CommentForm
        submitLabel="Write"
        handleSubmit={addComment}
        setActive={setActiveComment}
      />
      <div style={{ marginTop: "10px", marginLeft: "5px" }}>
        {rootComments.length === 0 && (
          <h4 style={{ fontWeight: "400", marginTop: "30px" }}>
            Don't have any comments right now
          </h4>
        )}
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment._id}
            comment={rootComment}
            replies={getReplies(rootComment._id)}
            getReplies={getReplies}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            currentUserId={authState.user !== null ? authState.user._id : null}
          />
        ))}
      </div>
    </CommentsContainer>
  );
};

export default Comments;
