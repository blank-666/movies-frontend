import axios from "axios";
import serialize from "../helpers/serialize-params";
import { apiUrl } from "./service";
import { IActor } from "../interfaces/actors.interface";

const getActors = async (params?: any) => {
  const { data } = await axios.get(`${apiUrl}/actors?${serialize(params)}`);

  return data;
};

const addActor = async (actor: IActor) => {
  const { data } = await axios.post(`${apiUrl}/actors`, {
    name: actor,
  });

  return data;
};

const actorsService = {
  getActors,
  addActor,
};

export default actorsService;
