import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UNSECURED } from "../../constant/Util";

import { TextFields2 } from "../../components/textField/Textfields";

import "./Home.css";
import Posts from "./post/Posts";
import PostModal from "./post/PostModal";
import { UserProfile } from "../sharedComponents/avatar/UserProfile";

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
              <UserProfile
                imgSize={{ width: "35px", borderRadius: "50%", height: "35px" }}
              />

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
