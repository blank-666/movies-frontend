import { FC, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MovieForm from "../../../components/forms/movie.form";
import { useForm } from "antd/es/form/Form";
import { IMovie } from "../../../interfaces/movies.interface";
import { moviesService } from "../../../services";
import {
  convertYearToDayJS,
  convertToSelectOptions,
  parseFileForSetFields,
} from "../../../helpers/formatting";

const EditMovie: FC = () => {
  const [movie, setMovie] = useState<IMovie | null>(null);
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchMovie(id);
  }, [id]);

  useEffect(() => {
    if (movie) {
      const convertedMovie = {
        ...movie,
        year: convertYearToDayJS(movie.year),
        directors: convertToSelectOptions(movie.directors),
        actors: convertToSelectOptions(movie.actors),
        poster: parseFileForSetFields(movie.poster),
      };
      form.setFieldsValue(convertedMovie);
    }
  }, [movie]);

  async function fetchMovie(id: string) {
    const { movie: movieData } = await moviesService.getMovieById(id);
    setMovie(movieData);
  }

  const onFinish = async (formData: any) => {
    if (id) {
      const response = await moviesService.updateMovie(id, formData);

      if (response.id) navigate(`/`);
      navigate(`/movies/view/${response.id}`);
    }
  };

  return <MovieForm form={form} onFinish={onFinish} editMode />;
};

export default EditMovie;
