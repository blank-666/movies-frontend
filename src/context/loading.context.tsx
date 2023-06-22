import { createContext, FC, useState, ReactNode } from "react";

export interface IProvider {
  children: ReactNode;
}

export interface ILoadingContext {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>(
  {} as ILoadingContext
);

const LoadingContextProvider: FC<IProvider> = ({ children }) => {
  const [isLoading, setLoading] = useState<boolean>(false);

  const initialValue = { isLoading, setLoading };

  return (
    <LoadingContext.Provider value={initialValue}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContextProvider;
