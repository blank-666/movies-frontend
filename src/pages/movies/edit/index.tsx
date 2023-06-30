import { FC } from "react";
import { useParams } from "react-router-dom";

const EditMovie: FC = () => {
  const { id } = useParams();

  return <h1>Edit Page {id}</h1>;
};

export default EditMovie;
