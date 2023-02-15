import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UNSECURED } from "../../constant/Util";

import { TextFields2 } from "../../components/textField/Textfields";

import "./Home.css";
import Posts from "./post/Posts";
import PostModal from "./post/PostModal";
import { UserProfile } from "../sharedComponents/avatar/UserProfile";
import { Scroll } from "../sharedComponents/infiniteScrollLoaders/Scroll";
import { useHomeFunctanility } from "./useHomeApi";
import { HpaginationTrue, moreHomePage } from "../../redux/postSlice";
import Suggestions from "./suggestions/Suggestions";

const Home = () => {
  const [hasMore, sethasMore] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const { getPosts } = useHomeFunctanility();
  const [open, setOpen] = useState(false);
  const user = UNSECURED(userData).user;
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.post.allPosts);
  const moreHomePost = true;
  const noMorePosts = useSelector((state) => state.post.noHomePost);

  // console.log(UNSECURED(userData));

  useEffect(() => {
    noMorePosts === true && sethasMore(false);
    return () => dispatch({ type: HpaginationTrue });
  }, [noMorePosts]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMoredata = () => {
    setTimeout(() => {
      getPosts(user, moreHomePost);
      dispatch({ type: moreHomePage });
    }, 500);
  };

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

        <div className="row ">
          <div className="col-sm-8 col-lg-6 p-0">
            {allPosts ? (
              <Scroll
                fetchMoredata={fetchMoredata}
                hasMore={hasMore}
                data={allPosts}
              >
                <div className="container mt-4">
                  <div className="row">
                    <Posts />
                  </div>
                </div>
              </Scroll>
            ) : (
              <Posts />
            )}
          </div>{" "}
          <div className="col-sm-4 col-lg-6 mt-4">
            <Suggestions user={user} />
          </div>
        </div>
        <PostModal open={open} setOpen={setOpen} user={user} />
      </div>
    </>
  );
};

export default Home;
