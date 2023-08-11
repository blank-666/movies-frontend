import axios from "axios";
import { apiUrl } from "./service";
import { ITableParams } from "../interfaces/params.interface";
import serialize from "../helpers/serialize-params";

const getCommentsById = async (movieId: string, params?: ITableParams) => {
  const { data } = await axios.get(
    `${apiUrl}/comments/${movieId}?${serialize(params)}`
  );
  return data;
};

const createComment = async () => {
  const { data } = await axios.post(`${apiUrl}/comments`, {
    text: "test",
  });

  return data;
};

const commentsService = {
  getCommentsById,
  createComment,
};

export default commentsService;
