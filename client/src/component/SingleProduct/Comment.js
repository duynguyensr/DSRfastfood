import React, { useContext } from "react";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import { AuthContext } from "../../context/authContext";

const CommentContainer = styled.div`
  width: 100%;
`;
const Logo = styled.span`
  display: flex;
  align-items: center;
  height: 50px;
  width: 50px;
  justify-content: center;
  font-size: 30px;
  color: white;
  background: #d4d4d4;
  margin-top: 2.5px;
`;

const SingleComment = styled.div`
  display: flex;
  align-items: start;
  margin-bottom: 17px;
  width: 100%;
`;

const CommentInfo = styled.div`
  margin-left: 8px;
  width: 100%;
`;

const CommentDate = styled.span`
  display: inline;
  margin-left: 4px;
  color: #a1a1aa;
  font-size: 90%;
  font-weight: 400;
`;

const RepliesContainer = styled.div`
  margin-left: 50px;
`;

const ActionButton = styled.span`
  font-size: 85%;
  font-weight: 500;
  color: #3f3f46;
  margin-right: 4px;
  cursor: pointer;
  &:hover {
    color: #dc2626;
  }
`;

const Comment = ({
  comment,
  replies,
  getReplies,
  setActiveComment,
  activeComment,
  deleteComment,
  addComment,
  parentId = null,
  currentUserId,
}) => {
  const { authState } = useContext(AuthContext);
  const isEditing = activeComment && activeComment.id === comment._id;
  //   const fiveMinutes = 300000;
  //   const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes;
  const canDelete = currentUserId === comment.userId._id;

  const canReply = Boolean(currentUserId);
  const DateComment = new Date(comment.createdAt);
  return (
    <CommentContainer key={comment._id} className="comment">
      <SingleComment className="comment-image-container">
        <Logo
          style={{ padding: "6px", borderRadius: "50%", background: "#d4d4d4" }}
        >
          <PersonIcon style={{ fontSize: "35px", color: "#18181b" }} />
        </Logo>
        <CommentInfo>
          <div style={{ fontWeight: "500", color: "blue", display: "inline" }}>
            {comment.userId.username}
          </div>
          <CommentDate>
            {DateComment.getDate()}/{DateComment.getMonth() + 1}/
            {DateComment.getFullYear()}
          </CommentDate>
          <div style={{ fontWeight: "400", fontSize: "120%" }}>
            {comment.desc}
          </div>
          {canReply && (
            <ActionButton
              onClick={() =>
                setActiveComment({ id: comment._id, type: "replying" })
              }
            >
              Reply
            </ActionButton>
          )}
          {canDelete && (
            <ActionButton
              onClick={() => {
                deleteComment(comment._id);
              }}
            >
              Delete
            </ActionButton>
          )}
          {isEditing && (
            <CommentForm
              submitLabel="Update"
              hasCancelButton
              initialText={comment.desc}
              handleCancel={() => {
                setActiveComment(null);
              }}
              setActive={setActiveComment}
              handleSubmit={addComment}
              parentId={comment._id}
            />
          )}
        </CommentInfo>
      </SingleComment>
      <RepliesContainer className="comment-right-part">
        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply._id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment._id}
                replies={getReplies(reply._id)}
                getReplies={getReplies}
                currentUserId={
                  authState.user !== null ? authState.user._id : null
                }
              />
            ))}
          </div>
        )}
      </RepliesContainer>
    </CommentContainer>
  );
};

export default Comment;
