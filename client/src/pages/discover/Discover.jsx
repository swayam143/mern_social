import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UNSECURED } from "../../constant/Util";
import { paginationTrue } from "../../redux/discoverPostsSlice";
import Posts from "../home/post/Posts";
import { useHomeFunctanility } from "../home/useHomeApi";
import { Scroll } from "../sharedComponents/infiniteScrollLoaders/Scroll";

const Discover = () => {
  const [hasMore, sethasMore] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  const allPosts = useSelector((state) => state.discoverPost.disoverPost);
  const user = UNSECURED(userData).user;
  const [moreAllPostPge, setMoreAllPostPage] = useState(2);
  const moreAllPost = true;
  const { getAllPosts } = useHomeFunctanility(moreAllPost, moreAllPostPge);
  const noMorePosts = useSelector((state) => state.discoverPost.noPost);

  const fetchMoredata = () => {
    setTimeout(() => {
      getAllPosts();
      setMoreAllPostPage(moreAllPostPge + 1);
    }, 500);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    noMorePosts === true && sethasMore(false);
    //
    //After page change we again have to fetch data
    //
    return () => dispatch({ type: paginationTrue });
  }, [noMorePosts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Scroll fetchMoredata={fetchMoredata} hasMore={hasMore} data={allPosts}>
      <div className="container mt-4">
        <div className="row">
          <Posts user={user} discover={true} />
        </div>
      </div>
    </Scroll>
  );
};

export default Discover;
