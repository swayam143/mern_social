import { Avatar, CircularProgress, IconButton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../components/button/Buttons";
import { FullPageLoader } from "../../components/loader/Loaders";
import { MainHeading, Text1 } from "../../components/text/Texts";
import { Error, Success } from "../../components/toast/Toasts";
import { GET } from "../../constant/RequestAuthService";
import { UNSECURED } from "../../constant/Util";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.css";
import EditModal from "./EditModal";
import { Base_url, Img_url } from "../../constant";
import axios from "axios";
import { isLogin } from "../../redux/authSlice";
import FollowersModal from "./FollwersModal";
import FollowingModal from "./FollowingModal";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [follow, setFollow] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [followermodal, setFollowerModal] = useState(false);
  const [followingmodal, setFollowingModal] = useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        setOpen(true);
        const response = await GET("user", { id: id });
        if (response.status === 200) {
          setUser(response.data.users);
          setOpen(false);
        } else {
          Error(response.status.mssg);
          setOpen(false);
        }
      } catch (err) {
        Error(err);
        setOpen(false);
      }
    };
    if (id === UNSECURED(userData).user._id) {
      setUser(UNSECURED(userData).user);
    } else {
      getUser();
    }
  }, [id, userData, open]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(user);

  useEffect(() => {
    if (user && userData) {
      const isUserFollowed = user?.followers?.find(
        (item) => item._id === UNSECURED(userData).user._id
      );
      if (isUserFollowed) {
        setFollow(true);
      } else {
        setFollow(false);
      }
    }
  }, [user, userData]);

  const followUser = async () => {
    setLoading(true);
    const response = await axios.post(`${Base_url}user/${user._id}/follow`, {
      userId: UNSECURED(userData).user._id,
    });
    if (response.status === 200) {
      setLoading(false);
      dispatch({ type: isLogin, payload: response.data });
      await Success(response.data.msg);
    }
    setLoading(false);
  };

  const unfollowUser = async () => {
    setLoading(true);
    const response = await axios.post(`${Base_url}user/${user._id}/unfollow`, {
      userId: UNSECURED(userData).user._id,
    });
    if (response.status === 200) {
      setLoading(false);
      dispatch({ type: isLogin, payload: response.data });
      await Error(response.data.msg);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="card-container relative">
        <div className="">
          <div className="image-container mt-3 mb-2">
            {user && user.picture !== "" ? (
              <Zoom>
                <img
                  className="img-fluid user_img"
                  src={`${Img_url}${user?.picture}`}
                  alt="users"
                />{" "}
              </Zoom>
            ) : (
              <Avatar
                className="user_img"
                sx={{ bgcolor: deepPurple[500], fontSize: "50px" }}
              >
                {user && user?.fullname?.[0].toUpperCase()}
              </Avatar>
            )}
          </div>
        </div>

        <div className="lower-container">
          <div>
            <MainHeading title={user?.fullname.toUpperCase()} />
            <p className="fs_18">@{user?.username}</p>
            <p className="fs_14">{user?.email}</p>
            {loading === true ? (
              <CircularProgress color="secondary" />
            ) : (
              UNSECURED(userData).user._id !== id &&
              (follow === true ? (
                <PrimaryButton
                  onClick={unfollowUser}
                  title="Following"
                  sx={{
                    color: "#000 !important",
                    margin: "8px auto 0px auto !important",
                  }}
                />
              ) : (
                <SecondaryButton
                  title="Follow"
                  classNames="mx-auto mt-2"
                  onClick={followUser}
                />
              ))
            )}
          </div>
          <div
            style={{ gap: "20px" }}
            className="d-flex align-items-center justify-content-center mt-3"
          >
            <Text1
              onClick={() => setFollowerModal(true)}
              classNames="pointer"
              title={`${user?.followers?.length} Followers`}
            />

            <Text1
              onClick={() => setFollowingModal(true)}
              classNames="pointer"
              title={`${user?.following?.length} Following`}
            />
          </div>
        </div>
        {UNSECURED(userData).user._id === id && (
          <IconButton onClick={() => setModal(true)} className="edit_btn">
            {" "}
            <MoreVertIcon sx={{ color: `var(--601)` }} />
          </IconButton>
        )}
      </div>
      <FullPageLoader open={open} setOpen={setOpen} />
      <EditModal modal={modal} setModal={setModal} user={user} />
      <FollowersModal
        followermodal={followermodal}
        setFollowerModal={setFollowerModal}
        user={user}
      />
      <FollowingModal
        followingmodal={followingmodal}
        setFollowingModal={setFollowingModal}
        user={user}
      />
    </>
  );
};

export default Profile;
