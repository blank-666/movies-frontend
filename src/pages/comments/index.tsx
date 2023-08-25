import { FC, useEffect, useContext, useState, useRef } from "react";
import { useParams } from "react-router-dom";

import CreateCommentForm from "../../components/comments/comments.form";
import CommentsList from "../../components/comments/comments.list";
import SortButton, { ISortTypes } from "../../components/ui/button/button.sort";
import Loader from "../../components/ui/loader/loader";

import { commentsService } from "../../services";
import { UserContext } from "../../context/user.context";
import { LoadingContext } from "../../context/loading.context";
import {
  ICommentsList,
  INewComment,
} from "../../interfaces/comments.interface";
import { ITableParams } from "../../interfaces/params.interface";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

import "./style.scss";

const Comments: FC = () => {
  const [movieTitle, setMoviesTitle] = useState<string | null>(null);
  const [comments, setComments] = useState<ICommentsList>([]);
  const [totalComments, setTotalComments] = useState<number>(0);

  const [sort, setSort] = useState<ISortTypes>("ascend");
  const [currentChunk, setCurrentChunk] = useState<number>(1);

  const listRef = useRef(null);
  const listEndRef = useRef(null);

  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { isLoading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (id) fetchComments(id);
  }, [id, currentChunk, sort]);

  useEffect(() => {
    // reset pagination when sort was changed
    setCurrentChunk(1);
  }, [sort]);

  const loadMoreComments = () => setCurrentChunk((prev) => prev + 1);

  useInfiniteScroll(listRef, listEndRef, () => {
    const isListEnd = comments.length === totalComments;
    if (isLoading || isListEnd || !comments.length) return;

    loadMoreComments();
  });

  const addCommentHandler = async (newComment: INewComment) => {
    await commentsService.createComment(newComment);
    setCurrentChunk(1);
    await fetchComments(id!);
  };

  async function fetchComments(id: string) {
    setLoading(true);

    const params: ITableParams = {
      pagination: {
        current: currentChunk,
        pageSize: 10,
      },
      sort: {
        field: "date",
        order: sort,
      },
    };

    const { title, rows, chunk, total } = await commentsService.getCommentsById(
      id,
      params
    );

    if (chunk === 1) {
      setComments(rows);
    } else {
      setComments((prev) => [...prev, ...rows]);
    }

    setMoviesTitle(title);
    setTotalComments(total);
    setLoading(false);
  }

  return (
    <div className="comments-page">
      <div className="comments-page__content">
        <div className="comments-page__content__header">
          <SortButton sortBy="date" sort={sort} setSort={setSort} />
        </div>
        {isLoading ? <Loader /> : null}
        <CommentsList movieTitle={movieTitle} comments={comments} />
        <div ref={listEndRef} style={{ height: 50 }} />
      </div>
      {user ? <CreateCommentForm onAddComment={addCommentHandler} /> : null}
    </div>
  );
};

export default Comments;
