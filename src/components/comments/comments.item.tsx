import { FC } from "react";
import { IComment } from "../../interfaces/comments.interface";
import { Avatar, Card, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

import "./style.scss";

interface ICommentItemProps {
  comment: IComment;
}

const Comment: FC<ICommentItemProps> = ({ comment }) => {
  const { name, text, date } = comment;

  const dateString = new Date(date).toLocaleDateString("en-GB");

  return (
    <Card className="comment-card">
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
