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
import { followsUser } from "../../redux/authSlice";
import FollowersModal from "./FollwersModal";
import FollowingModal from "./FollowingModal";
import { UsersProfile } from "../sharedComponents/avatar/UserProfile";
import Posts from "../home/post/Posts";
import { useHomeFunctanility } from "../home/useHomeApi";
import { Scroll } from "../sharedComponents/infiniteScrollLoaders/Scroll";
import { moreUserPage, UpaginationTrue } from "../../redux/userPostSlice";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const [modal, setModal] = useState(false);
  const [follow, setFollow] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(false);
  const [followermodal, setFollowerModal] = useState(false);
  const [followingmodal, setFollowingModal] = useState(false);
  const allPosts = useSelector((state) => state.userPost.allPosts);
  const noMorePosts = useSelector((state) => state.userPost.noUserPost);
  const moreUserPost = true;
  const { getUserPosts, getAllPosts } = useHomeFunctanility();
  // console.log(noMorePosts);

  const dispatch = useDispatch();

  const fetchMoredata = () => {
    setTimeout(() => {
      getUserPosts(id, moreUserPost);
      dispatch({ type: moreUserPage });
    }, 500);
  };

  useEffect(() => {
    noMorePosts === true && sethasMore(false);
    //
    //After page change we again have to fetch data
    //
    return () => dispatch({ type: UpaginationTrue });
  }, [noMorePosts]); // eslint-disable-line react-hooks/exhaustive-deps

  const { id } = useParams();

  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id !== null && id !== null) {
      sethasMore(true);
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
      getAllPosts();
      setLoading(false);
      // dispatch({ type: isLogin, payload: response.data });
      dispatch({ type: followsUser, payload: { data: user } });
      await Success(response.data.msg);
    }
    setLoading(false);
  };

  const unfollowUser = async () => {
    getAllPosts();
    setLoading(true);
    const response = await axios.post(`${Base_url}user/${user._id}/unfollow`, {
      userId: UNSECURED(userData).user._id,
    });
    if (response.status === 200) {
      setLoading(false);
      dispatch({ type: followsUser, payload: { data: user } });
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
                  classNames=" w-100 "
                  title="Following"
                  sx={{
                    color: "#000 !important",
                    margin: "20px auto 0px auto !important",
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

          {allPosts ? (
            <Scroll
              fetchMoredata={fetchMoredata}
              hasMore={hasMore}
              data={allPosts}
            >
              <div className="container mt-4 p-0">
                <div className="row">
                  <Posts onlyUserPost={true} />
                </div>
              </div>
            </Scroll>
          ) : (
            <Posts onlyUserPost={true} />
          )}

          {/* <Posts user={user} onlyUserPost={true} /> */}
        </div>
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
