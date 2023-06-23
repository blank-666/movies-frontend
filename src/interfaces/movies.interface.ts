interface IMdb {
  rating: number;
  votes: number;
  id: number;
}

export interface IMovie {
  _id: string;
  plot: string;
  genres: string[];
  rated: string;
  actors: string[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  year: number;
  directors: string[];
  writers: string[];
  imdb: IMdb;
  countries: string;
  type: string;
  is_favorite?: boolean;
}

export type IMoviesList = IMovie[];
