import { FC } from "react";
import { Typography } from "antd";
import { ICommentsList } from "../../interfaces/comments.interface";
import Comment from "./comments.item";

interface ICommentsListProps {
  movieTitle: string | null;
  comments: ICommentsList;
}

const CommentsList: FC<ICommentsListProps> = ({ movieTitle, comments }) => {
  if (!movieTitle) return null;
  return (
    <div>
      <h1>{movieTitle}</h1>
      {comments.length ? (
        comments.map((comment) => <Comment comment={comment} />)
      ) : (
        <Typography.Title level={5} style={{ textAlign: "center" }}>
          No comments yet
        </Typography.Title>
      )}
    </div>
  );
};

export default CommentsList;
