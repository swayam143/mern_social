import React from "react";
import { useSelector } from "react-redux";
import { UNSECURED } from "../../constant/Util";
import Posts from "../home/post/Posts";

const Discover = () => {
  const userData = useSelector((state) => state.auth.userData);

  const user = UNSECURED(userData).user;
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-8 col-lg-6">
          <Posts user={user} discover={true} />
        </div>
      </div>
    </div>
  );
};

export default Discover;
