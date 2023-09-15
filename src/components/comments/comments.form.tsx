import { Button, Input, Spin } from "antd";
import { FC, useContext, useState } from "react";
import CollapseButton from "../ui/button/button.collapse";

import { INewComment } from "../../interfaces/comments.interface";
import { UserContext } from "../../context/user.context";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";

interface ICommentForm {
  onAddComment: (comment: INewComment) => Promise<void>;
}

const CreateCommentForm: FC<ICommentForm> = ({ onAddComment }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formActive, setFormActive] = useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");

  const { id: movie_id } = useParams();
  const { isMobile } = useWindowDimensions();

  const { user } = useContext(UserContext);

  if (!user || !movie_id) return null;

  const onFormCollapse = (isActive: boolean) => setFormActive(isActive);

  const addCommentHandler = async () => {
    setLoading(true);

    const newComment: INewComment = {
      text: commentText,
      movie_id,
    };
    await onAddComment(newComment);

    setCommentText("");
    setLoading(false);
  };

  return (
    <div
      className="comment-form-section"
      style={{ bottom: formActive ? 0 : "-10.6rem" }}
    >
      {loading ? (
        <div className="comment-form-section__loader">
          <Spin />
        </div>
      ) : null}

      <CollapseButton
        isActive={formActive}
        onClick={onFormCollapse}
        tooltipMessage="Add comment"
        style={{
          position: "absolute",
          top: "-2.7rem",
          right: isMobile ? "1rem" : "5%",
        }}
      />
      <div className="comment-form-section__content">
        <Input.TextArea
          placeholder="New comment..."
          className="comment-form-section__content__textArea"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          showCount
          maxLength={300}
        />
        <Button
          type="primary"
          onClick={addCommentHandler}
          disabled={!commentText}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};

export default CreateCommentForm;
