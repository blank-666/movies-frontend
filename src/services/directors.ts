import axios from "axios";
import serialize from "../helpers/serialize-params";
import { apiUrl } from "./service";

const getDirectors = async (params?: any) => {
  const { data } = await axios.get(`${apiUrl}/directors?${serialize(params)}`);

  return data;
};

const directorsService = {
  getDirectors,
};

export default directorsService;
