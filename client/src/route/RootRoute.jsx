import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import NotFound from "../pages/notFound/NotFound";
import Home from "../pages/home/Home";
import Navbar from "../components/navbar/Navbar";
import { useSelector } from "react-redux";
import Message from "../pages/message/Message";
import Discover from "../pages/discover/Discover";
import Notify from "../pages/notify/Notify";
import Profile from "../pages/profile/Profile";
import PostDetails from "../pages/postDetails.jsx/PostDetails";

const RootRoute = () => {
  const userData = useSelector((state) => state.auth.userData);
  //   console.log(userData === null);

  // const ProtectRoute=(...props)=>{

  // }

  return (
    <>
      <BrowserRouter>
        {" "}
        <Navbar />
        <Routes>
          <Route
            path="/login"
            element={
              userData !== null ? <Navigate replace to="/" /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              userData !== null ? <Navigate replace to="/" /> : <Register />
            }
          />
          <Route
            path="/"
            element={
              userData === null ? <Navigate replace to="/login" /> : <Home />
            }
          />

          <Route
            path="/message"
            element={
              userData === null ? <Navigate replace to="/login" /> : <Message />
            }
          />
          <Route
            path="/discover"
            element={
              userData === null ? (
                <Navigate replace to="/login" />
              ) : (
                <Discover />
              )
            }
          />
          <Route
            path="/notify"
            element={
              userData === null ? <Navigate replace to="/login" /> : <Notify />
            }
          />
          <Route
            path="/profile/:id"
            element={
              userData === null ? <Navigate replace to="/login" /> : <Profile />
            }
          />
          <Route path="/post/:id" element={<PostDetails />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RootRoute;
