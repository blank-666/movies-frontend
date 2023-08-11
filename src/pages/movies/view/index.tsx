import { FC, useEffect, useMemo, useState, ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import ItemViewer from "../../../components/item-viewer";
import { IMovie } from "../../../interfaces/movies.interface";
import { moviesService } from "../../../services";
import { Image } from "antd";

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
    total_comments: "Comments",
  };

  const viewItem = useMemo(() => {
    if (movie) {
      return Object.keys(viewItemKeyToLabel).reduce((obj, key) => {
        const movieObj = movie as any;
        let value: string | ReactNode = movieObj[key] ?? "---";
        if (key === "poster") {
          value = <Image src={movie[key]} width={200} />;
        } else if (key === "total_comments") {
          value = <Link to={`/comments/${movie._id}`}>{movie[key]}</Link>;
        }

        return {
          ...obj,
          [key]: value,
        };
      }, {});
    }
  }, [movie]);

  return <ItemViewer item={viewItem} keyToLabelMap={viewItemKeyToLabel} />;
};

export default ViewMovie;
