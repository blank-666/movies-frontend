import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/router";
import LoadingContextProvider from "./context/loading.context";
import UserContextProvider from "./context/user.context";
import { socket } from "./socket";

function App() {
  useEffect(() => {
    function onConnect() {
      console.log("+++Socket connected!+++");
    }

    function onDisconnect() {
      console.log("---Socket disconnected!---");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

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
