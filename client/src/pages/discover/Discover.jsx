import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DpaginationTrue,
  moreDiscoverPage,
} from "../../redux/discoverPostsSlice";
import Posts from "../home/post/Posts";
import { useHomeFunctanility } from "../home/useHomeApi";
import { Scroll } from "../sharedComponents/infiniteScrollLoaders/Scroll";

const Discover = () => {
  const [hasMore, sethasMore] = useState(true);
  const allPosts = useSelector((state) => state.discoverPost.disoverPost);
  const morePage = true;
  const { getAllPosts } = useHomeFunctanility();
  const noMorePosts = useSelector((state) => state.discoverPost.noPost);

  const fetchMoredata = () => {
    setTimeout(() => {
      getAllPosts(morePage);
      dispatch({ type: moreDiscoverPage });
    }, 500);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    noMorePosts === true && sethasMore(false);
    //
    //After page change we again have to fetch data
    //
    return () => dispatch({ type: DpaginationTrue });
  }, [noMorePosts]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    allPosts === null && getAllPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return allPosts ? (
    <Scroll fetchMoredata={fetchMoredata} hasMore={hasMore} data={allPosts}>
      <div className="container mt-4">
        <div className="row">
          <Posts discover={true} post={allPosts} allPosts={allPosts} />
        </div>
      </div>
    </Scroll>
  ) : (
    <Posts discover={true} post={allPosts} allPosts={allPosts} />
  );
};

export default Discover;
