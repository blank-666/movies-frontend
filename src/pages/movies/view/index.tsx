import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemViewer from "../../../components/item-viewer";
import { IMovie } from "../../../interfaces/movies.interface";
import { moviesService } from "../../../services";

const ViewMovie: FC = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<IMovie | null>(null);

  useEffect(() => {
    if (id) fetchMovie(id);
  }, []);

  async function fetchMovie(id: string) {
    const { movie: movieData } = await moviesService.getMovieById(id);
    setMovie(movieData);
  }

  const viewItemKeyToLabel = {
    _id: "ID",
    title: "Title",
    poster: "Poster",
    fullplot: "Full Plot",
    year: "Year",
    type: "Type",
    genres: "Genres",
    directors: "Directors",
    writers: "Writers",
    actors: "Cast",
    is_favorite: "Favorite",
  };

  return (
    <ItemViewer item={movie as object} keyToLabelMap={viewItemKeyToLabel} />
  );
};

export default ViewMovie;
