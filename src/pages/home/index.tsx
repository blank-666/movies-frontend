import { FC, useContext } from "react";
import { UserContext } from "../../context/user.context";

const Home: FC = () => {
  const { user } = useContext(UserContext);
  return <h1> Hello{user ? ` ${user.name}` : ""}! It's a home page!</h1>;
};

export default Home;
