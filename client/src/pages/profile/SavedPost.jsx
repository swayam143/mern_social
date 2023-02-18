import React from "react";
import { useSelector } from "react-redux";
import { FullPageLoader } from "../../components/loader/Loaders";
import { UNSECURED } from "../../constant/Util";
import Posts from "../home/post/Posts";

const SavedPost = () => {
  const userData = useSelector((state) => state.auth.userData);

  const post = UNSECURED(userData)?.user?.saved;
  // console.log(post);

  // useEffect(() => {
  //   setPosts(user?.saved);
  // }, [user]);
  return (
    <>
      {post && typeof post === "object" ? (
        <>
          {post.length === 0 ? (
            <h3>No Saved Post found</h3>
          ) : (
            <Posts post={post} allPosts={post} savedPosts={true} />
          )}
        </>
      ) : (
        <FullPageLoader open={true} />
      )}
    </>
  );
};

export default SavedPost;
