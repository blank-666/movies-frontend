import axios from "axios";
import serialize from "../helpers/serialize-params";
import { apiUrl } from "./service";
import { IDirector } from "../interfaces/directors.interface";

const getDirectors = async (params?: any) => {
  const { data } = await axios.get(`${apiUrl}/directors?${serialize(params)}`);

  return data;
};

const addDirector = async (director: IDirector) => {
  const { data } = await axios.post(`${apiUrl}/directors`, {
    name: director,
  });

  return data;
};

const directorsService = {
  getDirectors,
  addDirector,
};

export default directorsService;
