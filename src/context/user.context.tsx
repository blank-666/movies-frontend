import { createContext, FC, useState, ReactNode, useEffect } from "react";
import { IUser } from "../interfaces/user.interface";
import authService from "../services/auth";

export interface IProvider {
  children: ReactNode;
}

export interface IUserContext {
  user: null | IUser;
  setUser: (userPayload: IUser | null) => void;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

const UserContextProvider: FC<IProvider> = ({ children }) => {
  const [user, setUser] = useState<null | IUser>(null);

  const UID = localStorage.getItem("uid");

  const login = async () => {
    const { user } = await authService.getUser();
    setUser(user);
  };

  useEffect(() => {
    if (UID) {
      login();
    }
  }, [UID]);

  const initialValue = { user, setUser };

  return (
    <UserContext.Provider value={initialValue}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
