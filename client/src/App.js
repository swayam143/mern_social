import React from "react";
import RootRoute from "./route/RootRoute";
import "./App.css";
import { useSocketFunctionality } from "./socket/useSocket";

const App = () => {
  const { IsSocketActive, SocketClient } = useSocketFunctionality();
  //
  //It runs first time to get socket
  //
  IsSocketActive();
  //

  //
  //It runs every time after we get socket
  //
  SocketClient();
  //

  return <RootRoute />;
};

export default App;
