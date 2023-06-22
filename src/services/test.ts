import axios from "axios";

const baseUrl = "http://localhost:3000";

const getInitialMessage = async () => {
  const res = await axios.get(baseUrl);
  console.log("res", res.data);
};

export default getInitialMessage;
