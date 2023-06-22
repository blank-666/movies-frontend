import axios from "axios";
import { message } from "antd";

const apiUrl = "http://localhost:3006";

axios.interceptors.response.use(
  (result) => {
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
