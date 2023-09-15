import { Button, Input, Spin } from "antd";
import { FC, useContext, useState, useEffect } from "react";
import CollapseButton from "../ui/button/button.collapse";

import { INewComment } from "../../interfaces/comments.interface";
import { UserContext } from "../../context/user.context";
import { useParams } from "react-router-dom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { socket } from "../../socket";

interface ICommentForm {
  onAddComment: (comment: INewComment) => Promise<void>;
}

const CreateCommentForm: FC<ICommentForm> = ({ onAddComment }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formActive, setFormActive] = useState<boolean>(true);
  const [commentText, setCommentText] = useState<string>("");
  const [typing, setTyping] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);

  const { id: movie_id } = useParams();
  const { isMobile } = useWindowDimensions();

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (commentText && !typing) setTyping(true);

    const delayDebounceFn = setTimeout(() => {
      setTyping(false);
    }, 3000);

    return () => clearTimeout(delayDebounceFn);
  }, [commentText]);

  useEffect(() => {
    if (typing) {
      socket.emit("user-typing", {
        name: user?.name,
        movieId: movie_id,
        typing: true,
      });
    } else {
      if (!firstRender) {
        socket.emit("user-typing", {
          name: user?.name,
          movieId: movie_id,
          typing: false,
        });
      }
      setFirstRender(false);
    }
  }, [typing]);

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
    setTyping(false);
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
