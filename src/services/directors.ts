import axios from "./service";
import serialize from "../helpers/serialize-params";
import { IDirector } from "../interfaces/directors.interface";

const getDirectors = async (params?: any) => {
  const { data } = await axios.get(`/directors?${serialize(params)}`);

  return data;
};

const addDirector = async (director: IDirector) => {
  const { data } = await axios.post(`/directors`, {
    name: director,
  });

  return data;
};

const directorsService = {
  getDirectors,
  addDirector,
};

export default directorsService;
