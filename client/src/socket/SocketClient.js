import { useEffect } from "react";
import { useSelector } from "react-redux";
import { UNSECURED } from "../constant/Util";
import io from "socket.io-client";

const SocketClient = () => {
  const userData = useSelector((state) => state.auth.userData);
  const user = UNSECURED(userData).user;

  const socket = io("http://localhost:5001");

  useEffect(() => {
    socket.emit("joinUser", user._id);
  }, [socket, user._id]);
  return true;
};

export default SocketClient;
