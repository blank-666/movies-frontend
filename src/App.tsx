import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router";
import LoadingContextProvider from "./context/loading.context";
import UserContextProvider from "./context/user.context";

function App() {
  return (
    <BrowserRouter>
      <LoadingContextProvider>
        <UserContextProvider>
          <AppRouter />
        </UserContextProvider>
      </LoadingContextProvider>
    </BrowserRouter>
  );
}

export default App;
