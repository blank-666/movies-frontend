interface IMdb {
  rating: number;
  votes: number;
  id: number;
}

export interface IObjectWithName {
  [k: string]: any;
  name: string;
}

export interface IMovie {
  _id: string;
  plot: string;
  genres: string[];
  rated: string;
  actors: IObjectWithName[];
  num_mflix_comments: number;
  poster: string;
  title: string;
  fullplot: string;
  languages: string[];
  year: number;
  directors: IObjectWithName[];
  writers: string[];
  imdb: IMdb;
  countries: string;
  type: string;
  total_comments: number;
  is_favorite?: boolean;
}

export type IMoviesList = IMovie[];
