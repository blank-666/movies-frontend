export interface IComment {
  _id: string;
  name: string;
  email: string;
  movie_id: string;
  text: string;
  date: string;
}

export interface INewComment {
  movie_id: string;
  text: string;
}

export type ICommentsList = IComment[];
