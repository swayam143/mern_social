import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UNSECURED } from "../../constant/Util";
import { Img_url } from "../../constant";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { TextFields2 } from "../../components/textField/Textfields";
import PostModal from "./PostModal";
import "./Home.css";
import Posts from "./Posts";

const Home = () => {
  const userData = useSelector((state) => state.auth.userData);

  const [open, setOpen] = useState(false);
  const user = UNSECURED(userData).user;

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6 col-lg-4">
            <div
              style={{ gap: "10px" }}
              className=" d-flex align-items-center justify-content-between"
            >
              {user && user.picture !== "" ? (
                <img
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                  className="img-fluid "
                  src={`${Img_url}${user?.picture}`}
                  alt="users"
                />
              ) : (
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {user && user?.fullname?.[0].toUpperCase()}
                </Avatar>
              )}

              <TextFields2
                placeholder="What's on Your mind ?"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-sm-8 col-lg-6">
            <Posts user={user} />
          </div>
        </div>
        <PostModal open={open} setOpen={setOpen} user={user} />
      </div>
    </>
  );
};

export default Home;
