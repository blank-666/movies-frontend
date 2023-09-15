import { FC, useContext } from "react";
import { UserContext } from "../../context/user.context";

import { IComment } from "../../interfaces/comments.interface";
import { Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./style.scss";
import classNames from "classnames";

interface ICommentItemProps {
  comment: IComment;
}

const Comment: FC<ICommentItemProps> = ({ comment }) => {
  const { name, text, date, email } = comment;
  const { user } = useContext(UserContext);

  const dateString = new Date(date).toLocaleDateString("en-GB");

  const commentCardClasses = classNames({
    "comment-card": true,
    "user-comment": user?.email === email,
  });

  return (
    <Card className={commentCardClasses}>
      <div className="comment-card__content">
        <div className="comment-card__content__date-container">
          {dateString}
        </div>
        <div className="comment-card__content__avatar-container">
          <Avatar icon={<UserOutlined />} size="large" />
        </div>
        <div className="comment-card__content__text-container">
          <Typography.Title level={5} style={{ margin: 0 }}>
            {name}
          </Typography.Title>
          <Typography.Text>{text}</Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default Comment;
