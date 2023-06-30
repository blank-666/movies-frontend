import { FC } from "react";
import { useNavigate } from "react-router";

import { moviesService } from "../../../services";

import MovieForm from "../../../components/forms/movie.form";
import { useForm } from "antd/es/form/Form";

const CreateMovie: FC = () => {
  const navigate = useNavigate();
  const [form] = useForm();

  const onFinish = async (formData: any) => {
    const response = await moviesService.createMovie(formData);

    if (response.id) navigate(`/`);
    navigate(`/movies/view/${response.id}`);
  };

  return <MovieForm form={form} onFinish={onFinish} />;
};

export default CreateMovie;
