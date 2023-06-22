import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router";
import LoadingContextProvider from "./context/loading.context";

function App() {
  return (
    <BrowserRouter>
      <LoadingContextProvider>
        <AppRouter />
      </LoadingContextProvider>
    </BrowserRouter>
  );
}

export default App;
