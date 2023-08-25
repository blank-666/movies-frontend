import axios from "axios";
import { apiUrl } from "./service";
import { ITableParams } from "../interfaces/params.interface";
import serialize from "../helpers/serialize-params";
import { INewComment } from "../interfaces/comments.interface";

const getCommentsById = async (movieId: string, params?: ITableParams) => {
  const { data } = await axios.get(
    `${apiUrl}/comments/${movieId}?${serialize(params)}`
  );
  return data;
};

const createComment = async (newComment: INewComment) => {
  const { data } = await axios.post(`${apiUrl}/comments`, newComment);

  return data;
};

const commentsService = {
  getCommentsById,
  createComment,
};

export default commentsService;
