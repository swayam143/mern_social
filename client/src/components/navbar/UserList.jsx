import { Avatar } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Heading1 } from "../text/Texts";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const UserList = ({ showDrop, setShowDrop }) => {
  const searchUsers = useSelector((state) => state.auth.searchUser);

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleClickAway = () => {
    setShowDrop(false);
  };

  const handleNavigate = (data) => {
    navigate(`/profile/${data._id}`);
    if (
      pathname.slice(pathname.indexOf("/") + 1, pathname.lastIndexOf("/")) ===
      "profile"
    ) {
      return;
    } else {
      setShowDrop(false);
    }
  };
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={` ${showDrop === true ? "" : "d-none"} user_list`}>
        {searchUsers?.length > 0 &&
          searchUsers.map((data, i) => (
            <div
              onClick={
                () => handleNavigate(data)
                // () => navigate(`/profile/${data._id}`)
              }
              key={i}
              style={{ gap: "15px" }}
              className="my-2 d-flex align-items-center pointer"
            >
              <Avatar></Avatar>
              <Heading1 title={data.username} />
            </div>
          ))}
        {searchUsers?.length === 0 && <p> Sorry !, No user found</p>}
      </div>
    </ClickAwayListener>
  );
};

export default UserList;
