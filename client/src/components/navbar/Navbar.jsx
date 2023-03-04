import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import HomeIcon from "@mui/icons-material/Home";
// import ForumIcon from "@mui/icons-material/Forum";
import ExploreIcon from "@mui/icons-material/Explore";
// import heart from "../../images/heart.gif";
import { SecondaryButton } from "../button/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, nullSearchUser, searchUsers } from "../../redux/authSlice";
import useMediaQuery from "@mui/material/useMediaQuery";
import LogoutIcon from "@mui/icons-material/Logout";
import { Reload, UNSECURED } from "../../constant/Util";
import "./nav.css";
import { useEffect } from "react";
import { POST } from "../../constant/RequestAuthService";
import UserList from "./UserList";
import SearchIcon from "@mui/icons-material/Search";

import { UserProfile } from "../../pages/sharedComponents/avatar/UserProfile";

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [search, setSearch] = useState("");
  const [showDrop, setShowDrop] = useState(false);

  const logout = () => {
    dispatch({ type: logoutUser });
    // Reload();
  };

  const navigate = useNavigate();
  const matches = useMediaQuery("(max-width:772px)");
  const ab991 = useMediaQuery("(max-width:991px)");
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const getUsers = async () => {
      const response = await POST("search", { search });
      if (response.status === 200) {
        dispatch({ type: searchUsers, payload: response.data.users });
      }
    };
    search.length > 0
      ? getUsers()
      : search.length === 0 && dispatch({ type: nullSearchUser });
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    search.length > 0 ? setShowDrop(true) : setShowDrop(false);
  }, [search]);

  // console.log()

  return (
    <div>
      <nav
        style={{ boxShadow: "0 1px 8px rgb(17 70 132 / 10%)" }}
        className={` ${
          (pathname === "/login" || pathname === "/register") && "d-none"
        }  bg-body-tertiary`}
      >
        <div
          className={` ${
            ab991 ? "container-fluid" : "container"
          } d-flex align-items-center justify-content-between flex-wrap`}
        >
          <div
            className={` ${matches && "py-2 mx-auto"} navbar-brand pointer`}
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="Bootstrap" width="150" />
          </div>
          <div className={` ${!matches && "mx-3"} flex-grow-1 relative`}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={` input_search w-100`}
              placeholder="Search here.."
            />
            <SearchIcon className="searchIcon" />
            <UserList showDrop={showDrop} setShowDrop={setShowDrop} />
          </div>
          <ul
            className={` ${
              matches && "justify-content-center flex-grow-1 pt-2"
            }  d-flex align-items-center  py-2`}
          >
            <li
              onClick={() => navigate("/")}
              className="nav-item dropdown d-flex align-items-center me-4 pointer"
            >
              <HomeIcon />
            </li>
            {/* <li
              onClick={() => navigate("/message")}
              className="nav-item dropdown d-flex align-items-center me-4 pointer"
            >
              <ForumIcon />
            </li> */}
            <li
              onClick={() => navigate("/discover")}
              className="nav-item dropdown d-flex align-items-center me-4 pointer"
            >
              <ExploreIcon />
            </li>

            {/* <li
              onClick={() => navigate("/notify")}
              className="nav-item dropdown d-flex align-items-center me-3 pointer"
            >
      
              <img src={heart} alt="hear" style={{ width: "30px" }} />
            </li> */}
            <li
              onClick={() =>
                navigate(`/profile/${UNSECURED(userData).user._id}`)
              }
              className="nav-item dropdown pointer d-flex align-items-center me-3 "
            >
              <UserProfile
                imgSize={{ width: "35px", borderRadius: "50%", height: "35px" }}
              />
            </li>
            <li className="nav-item dropdown pointer  d-flex align-items-center">
              {matches ? (
                <LogoutIcon onClick={logout} />
              ) : (
                <SecondaryButton title="Logout" onClick={logout} />
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
