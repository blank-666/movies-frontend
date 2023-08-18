import axios from "axios";
import { apiUrl } from "./service";
import { ISignUpPayload, ISignInPayload } from "../interfaces/auth";

const signUp = async (payload: ISignUpPayload) => {
  const { data } = await axios.post(`${apiUrl}/auth/sign-up`, payload);

  return data;
};

const signIn = async (payload: ISignInPayload) => {
  const { data } = await axios.post(`${apiUrl}/auth/sign-in`, payload);

  return data;
};

const getUser = async () => {
  const { data } = await axios.get(`${apiUrl}/auth/get-user`);

  return data;
};

const logOut = () => {
  localStorage.removeItem("uid");
};

const authService = {
  signIn,
  signUp,
  getUser,
  logOut,
};

export default authService;
