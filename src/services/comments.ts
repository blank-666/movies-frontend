import axios from "axios";
import { apiUrl } from "./service";
import { IActor } from "../interfaces/actors.interface";
import { ISortTypes } from "../components/ui/button/button.sort";

const getCommentsById = async (movieId: string, sort?: ISortTypes) => {
  const query = sort ? `?sort[date]=${sort}` : "";
  const { data } = await axios.get(`${apiUrl}/comments/${movieId}${query}`);
  return data;
};

const createComment = async (actor: IActor) => {
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
