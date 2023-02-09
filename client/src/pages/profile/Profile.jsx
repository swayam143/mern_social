import { CircularProgress } from "@mui/material";

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
import "react-medium-image-zoom/dist/styles.css";
import "./profile.css";
import EditModal from "./EditModal";
import { Base_url } from "../../constant";
import axios from "axios";
import { isLogin } from "../../redux/authSlice";
import FollowersModal from "./FollwersModal";
import FollowingModal from "./FollowingModal";
import { UsersProfile } from "../sharedComponents/avatar/UserProfile";
import Posts from "../home/post/Posts";
import { useHomeFunctanility } from "../home/useHomeApi";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const [follow, setFollow] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [followermodal, setFollowerModal] = useState(false);
  const [followingmodal, setFollowingModal] = useState(false);
  const { getUserPosts } = useHomeFunctanility();

  const { id } = useParams();

  const dispatch = useDispatch();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id !== null && id !== null) {
      getUserPosts(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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
      <div className="container mt-4 ">
        {" "}
        <div className="row d-flex align-items-center justify-content-center user_pr_center pb-5">
          <UsersProfile
            data={user}
            className="user_img"
            avtr_classaName="user_img fs_80"
          />
          <div>
            {loading === true ? (
              <CircularProgress color="secondary" />
            ) : (
              UNSECURED(userData).user._id !== id &&
              (follow === true ? (
                <PrimaryButton
                  onClick={unfollowUser}
                  classNames=" mt-2 w-100"
                  title="Following"
                  sx={{
                    color: "#000 !important",
                  }}
                />
              ) : (
                <SecondaryButton
                  title="Follow"
                  classNames="mx-auto mt-4 "
                  onClick={followUser}
                />
              ))
            )}
            {UNSECURED(userData).user._id === id && (
              <SecondaryButton
                title="Edit Profile"
                classNames="mx-auto mt-4 "
                onClick={() => setModal(true)}
              />
            )}
          </div>
          <MainHeading
            title={user?.fullname.toUpperCase()}
            classNames="text-center mt-2"
          />
          <div
            style={{ gap: "20px" }}
            className="d-flex align-items-center justify-content-center mt-2"
          >
            <p className="fs_18 ">@{user?.username}</p>
            <p className="fs_14">{user?.email}</p>
          </div>
          <div
            style={{ gap: "20px" }}
            className="d-flex align-items-center justify-content-center mt-2"
          >
            {" "}
            <div className="follower_cont">
              <Text1
                onClick={() => setFollowerModal(true)}
                classNames="pointer"
                title={`${user?.followers?.length} Followers`}
              />{" "}
            </div>{" "}
            <div className="follower_cont">
              <Text1
                onClick={() => setFollowingModal(true)}
                classNames="pointer"
                title={`${user?.following?.length} Following`}
              />
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          <MainHeading title="POST" classNames=" my-3" />

          <Posts user={user} onlyUserPost={true} />
        </div>
      </div>
      {/* <div className="container mt-4">
        <div className="row">
          <div className="col-sm-6 col-lg-3 mb-3">
            {" "}
            <div className=" user_img_profile">
              <UsersProfile
                data={user}
                className="user_img"
                avtr_classaName="user_img fs_80"
              />
            </div>
            {loading === true ? (
              <CircularProgress color="secondary" />
            ) : (
              UNSECURED(userData).user._id !== id &&
              (follow === true ? (
                <PrimaryButton
                  onClick={unfollowUser}
                  classNames=" mt-2 w-100"
                  title="Following"
                  sx={{
                    color: "#000 !important",
                  }}
                />
              ) : (
                <SecondaryButton
                  title="Follow"
                  classNames="mx-auto mt-4 "
                  onClick={followUser}
                />
              ))
            )}
            {UNSECURED(userData).user._id === id && (
              <SecondaryButton
                title="Edit Profile"
                classNames="mx-auto mt-4 "
                onClick={() => setModal(true)}
              />
            )}
          </div>{" "}
          <div className="col-sm-6 col-lg-9">
            <div>
              <div className="bx_sh profile_txt">
                <MainHeading title={user?.fullname.toUpperCase()} />
              </div>
              <br />
              <div className="bx_sh profile_txt mt-3">
                <p className="fs_18 ">@{user?.username}</p>
              </div>
              <br />
              <div className="bx_sh profile_txt mt-3">
                <p className="fs_14">{user?.email}</p>
              </div>
            </div>
            <div
              style={{ gap: "15px" }}
              className="d-flex align-items-center flex-wrap mt-3"
            >
              <div className="follower_cont">
                <Text1
                  onClick={() => setFollowerModal(true)}
                  classNames="pointer"
                  title={`${user?.followers?.length} Followers`}
                />{" "}
              </div>{" "}
              <div className="follower_cont">
                <Text1
                  onClick={() => setFollowingModal(true)}
                  classNames="pointer"
                  title={`${user?.following?.length} Following`}
                />
              </div>
            </div>
          </div>
        </div>
      </div> */}

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
