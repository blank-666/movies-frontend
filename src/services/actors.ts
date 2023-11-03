import axios from "./service";
import serialize from "../helpers/serialize-params";
import { IActor } from "../interfaces/actors.interface";

const getActors = async (params?: any) => {
  const { data } = await axios.get(`/actors?${serialize(params)}`);

  return data;
};

const addActor = async (actor: IActor) => {
  const { data } = await axios.post(`/actors`, {
    name: actor,
  });

  return data;
};

const actorsService = {
  getActors,
  addActor,
};

export default actorsService;
