import axios from "./service";
import serialize from "../helpers/serialize-params";

const getAllMovies = async (params?: any) => {
  const { data } = await axios.get(`/movies?${serialize(params)}`);

  return data;
};

const getMovieById = async (id: string) => {
  const { data } = await axios.get(`/movies/${id}`);

  return data;
};

const createMovie = async (movie: any) => {
  const { data } = await axios.post(`/movies`, movie);

  return data;
};

const updateMovie = async (id: string, movie: any) => {
  const { data } = await axios.put(`/movies/${id}`, movie);

  return data;
};

const toggleFavoriteMovies = async (ids: string[]) => {
  const { data } = await axios.put(`/movies/toggleFavorites`, { ids });

  return data;
};

const deleteMovies = async (ids: string[]) => {
  const { data } = await axios.post(`/movies/delete`, { ids });
  return data;
};

const getMoviesFilters = async () => {
  const { data } = await axios.get(`/movies/filters`);
  return data;
};

const moviesService = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  getMoviesFilters,
  toggleFavoriteMovies,
  deleteMovies,
};

export default moviesService;
