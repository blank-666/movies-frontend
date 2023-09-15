import { FC } from "react";
import { Typography } from "antd";
import { ICommentsList } from "../../interfaces/comments.interface";
import Comment from "./comments.item";
import SortButton, { ISortTypes } from "../ui/button/button.sort";
import UserTyping from "../ui/label/user-typing.label";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface ICommentsListProps {
  movieTitle: string | null;
  comments: ICommentsList;
  sort: ISortTypes;
  userTyping: string | null;
  setSort: React.Dispatch<React.SetStateAction<ISortTypes>>;
}

const CommentsList: FC<ICommentsListProps> = ({
  movieTitle,
  userTyping,
  comments,
  sort,
  setSort,
}) => {
  const { isMobile } = useWindowDimensions();
  if (!movieTitle) return null;

  return (
    <div className="comments-list">
      <div
        className="comments-list__header"
        style={{
          flexDirection: isMobile ? "column" : "row",
          marginBottom: isMobile ? "1rem" : 0,
        }}
      >
        <Typography.Title level={5}>{movieTitle}</Typography.Title>
        <div className="comments-list__header__actions-block">
          {userTyping ? (
            <UserTyping name={userTyping} style={{ marginRight: "1rem" }} />
          ) : null}
          <SortButton sortBy="date" sort={sort} setSort={setSort} />
        </div>
      </div>

      {comments.length ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <Typography.Title level={5} style={{ textAlign: "center" }}>
          No comments yet
        </Typography.Title>
      )}
    </div>
  );
};

export default CommentsList;
