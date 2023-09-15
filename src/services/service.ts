import axios from "axios";
import { message } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const UID = localStorage.getItem("uid");
  config.headers.authorization = UID;

  return config;
});

axios.interceptors.response.use(
  (result) => {
    if (result.data.message) message.success(result.data.message);

    return result;
  },
  async (err) => {
    console.log("err", err);
    if (err?.response?.data?.message) {
      message.error(err?.response?.data?.message);
    }
    throw err;
  }
);

export { apiUrl };
