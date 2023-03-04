import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { UNSECURED } from "../constant/Util";
import { getSocket } from "../redux/socketSlice";

export const useSocketFunctionality = () => {
  const socket = io("http://localhost:5001");
  const savedSocket = useSelector((state) => state.socket.socket);
  const userData = useSelector((state) => state.auth.userData);
  const user = userData !== null && UNSECURED(userData).user;

  console.log(savedSocket);

  const dispatch = useDispatch();

  const IsSocketActive = () => {
    useEffect(() => {
      socket.on("connect", () => {
        dispatch({ type: getSocket, payload: socket });
      });

      //   return () => {
      //     socket.close();
      //   };
    }, [dispatch]);
  };

  const SocketClient = () => {
    useEffect(() => {
      socket.emit("joinUser", user._id);
    }, [user._id]);
  };

  return { IsSocketActive, SocketClient };
};
