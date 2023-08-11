import { FC, useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { commentsService } from "../../services";
import { LoadingContext } from "../../context/loading.context";
import { ICommentsList } from "../../interfaces/comments.interface";
import Comment from "../../components/comments/comments.item";
import SortButton, { ISortTypes } from "../../components/ui/button/button.sort";

import "./style.scss";
import Loader from "../../components/ui/loader/loader";

const Comments: FC = () => {
  const [movieTitle, setMoviesTitle] = useState<string | null>(null);
  const [comments, setComments] = useState<ICommentsList>([]);
  const [sort, setSort] = useState<ISortTypes>("ascend");

  const { id } = useParams();
  const { isLoading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (id) fetchComments(id, sort);
  }, [id, sort]);

  async function fetchComments(id: string, sort: ISortTypes) {
    setLoading(true);

    const { title, comments } = await commentsService.getCommentsById(id, sort);

    setMoviesTitle(title);
    setComments(comments);

    setLoading(false);
  }

  return (
    <div className="comments-list">
      <div className="comments-list__header">
        <SortButton sortBy="date" sort={sort} setSort={setSort} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <h1>{movieTitle}</h1>
          {comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
