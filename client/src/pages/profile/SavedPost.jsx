import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { moreSavedPage, savedpaginationTrue } from "../../redux/savedPostSlice";
import Posts from "../home/post/Posts";
import { useHomeFunctanility } from "../home/useHomeApi";
import { Scroll } from "../sharedComponents/infiniteScrollLoaders/Scroll";

const SavedPost = () => {
  const [hasMore, sethasMore] = useState(true);
  const savedPost = useSelector((state) => state.savedPost.savedPost);
  const noMorePosts = useSelector((state) => state.savedPost.noPost);
  const morePage = true;
  const { getSavedPosts } = useHomeFunctanility();

  const dispatch = useDispatch();

  const fetchMoredata = () => {
    setTimeout(() => {
      getSavedPosts(morePage);
      dispatch({ type: moreSavedPage });
    }, 500);
  };

  useEffect(() => {
    savedPost === null && getSavedPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    noMorePosts === true && sethasMore(false);
    //
    //After page change we again have to fetch data
    //
    return () => dispatch({ type: savedpaginationTrue });
  }, [noMorePosts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {savedPost ? (
        <Scroll
          fetchMoredata={fetchMoredata}
          hasMore={hasMore}
          data={savedPost}
        >
          <div className="container mt-4">
            <div className="row">
              <Posts discover={true} post={savedPost} allPosts={savedPost} />
            </div>
          </div>
        </Scroll>
      ) : (
        <Posts discover={true} post={savedPost} allPosts={savedPost} />
      )}
    </>
  );
};

export default SavedPost;
