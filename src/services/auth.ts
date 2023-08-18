import axios from "axios";
import { apiUrl } from "./service";
import { ISignUpPayload } from "../interfaces/auth";

const signUp = async (payload: ISignUpPayload) => {
  const { data } = await axios.post(`${apiUrl}/auth/sign-up`, payload);

  return data;
};

const authService = {
  signUp,
};

export default authService;
