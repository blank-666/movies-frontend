import axios from "axios";
import serialize from "../helpers/serialize-params";
import { apiUrl } from "./service";

const getAllMovies = async (params?: any) => {
  const { data } = await axios.get(`${apiUrl}/movies?${serialize(params)}`);

  return data;
};

const getMovieById = async (id: string) => {
  const { data } = await axios.get(`${apiUrl}/movies/${id}`);

  return data;
};

const toggleFavoriteMovies = async (ids: string[]) => {
  const { data } = await axios.put(`${apiUrl}/movies/toggleFavorites`, { ids });

  return data;
};

const deleteMovies = async (ids: string[]) => {
  const { data } = await axios.post(`${apiUrl}/movies/delete`, { ids });
  return data;
};

const getMoviesFilters = async () => {
  const { data } = await axios.get(`${apiUrl}/movies/filters`);
  return data;
};

const moviesService = {
  getAllMovies,
  getMovieById,
  getMoviesFilters,
  toggleFavoriteMovies,
  deleteMovies,
};

export default moviesService;
