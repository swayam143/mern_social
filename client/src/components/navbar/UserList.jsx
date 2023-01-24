import React from "react";
import { useSelector } from "react-redux";

import ClickAwayListener from "@mui/base/ClickAwayListener";
import SearchCard from "../userSearchCard/SearchCard";
import { useLocation, useNavigate } from "react-router-dom";

const UserList = ({ showDrop, setShowDrop }) => {
  const searchUsers = useSelector((state) => state.auth.searchUser);

  const handleClickAway = () => {
    setShowDrop(false);
  };
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = async (data) => {
    navigate(`/profile/${data._id}`);

    if (
      pathname.slice(pathname.indexOf("/") + 1, pathname.lastIndexOf("/")) ===
      "profile"
    ) {
    } else {
      setShowDrop && setShowDrop(false);
    }
  };

  // console.log(searchUsers);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className={` ${showDrop === true ? "" : "d-none"} user_list`}>
        {searchUsers?.length > 0 &&
          searchUsers.map((data, i) => (
            <div key={i}>
              <SearchCard data={data} onClick={() => handleNavigate(data)} />
            </div>
          ))}
        {searchUsers?.length === 0 && <p> Sorry !, No user found</p>}
      </div>
    </ClickAwayListener>
  );
};

export default UserList;
