import { FC } from "react";
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
      {comments.map((comment) => (
        <Comment comment={comment} />
      ))}
    </div>
  );
};

export default CommentsList;
