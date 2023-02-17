import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Base_url } from "../../constant";
import { UNSECURED } from "../../constant/Util";
import { savedPosts } from "../../redux/authSlice";
import {
  adddiscoverPost,
  discoverPost,
  noMoreadddiscoverPost,
} from "../../redux/discoverPostsSlice";
import {
  addHomePost,
  getAllPost,
  noMoreaddHomePost,
} from "../../redux/postSlice";
import {
  addUserPost,
  getuserPost,
  noMoreaddUserPost,
} from "../../redux/userPostSlice";

export const useHomeFunctanility = (moreAllPost) => {
  const userData = useSelector((state) => state.auth.userData);
  const user = UNSECURED(userData).user;
  const moreDiscoverPage = useSelector(
    (state) => state.discoverPost.moreDiscoverPage
  );
  const moreUserPage = useSelector((state) => state.userPost.moreUserPage);

  const moreHomePage = useSelector((state) => state.post.morehomePages);

  const dispatch = useDispatch();
  const getPosts = async (user, moreHomePost) => {
    if (moreHomePost === true) {
      const response = await axios.get(
        `${Base_url}posts/${user._id}?page=${moreHomePage}&limit=10`
      );
      if (response.status === 200) {
        if (response.data.posts.length === 0) {
          dispatch({ type: noMoreaddHomePost });
        } else {
          dispatch({ type: addHomePost, payload: response.data.posts });
        }
      }
    } else {
      const response = await axios.get(`${Base_url}posts/${user._id}`);
      if (response.status === 200) {
        dispatch({ type: getAllPost, payload: response.data.posts });
      }
    }
  };

  const getAllPosts = async (morePage) => {
    if (morePage === true) {
      const response = await axios.post(
        `${Base_url}discoverposts?page=${moreDiscoverPage}&limit=10`,
        { user: user._id }
      );
      if (response.status === 200) {
        if (response.data.posts.length === 0) {
          dispatch({ type: noMoreadddiscoverPost });
        } else {
          dispatch({ type: adddiscoverPost, payload: response.data.posts });
        }
      }
    } else {
      const response = await axios.post(`${Base_url}discoverposts`, {
        user: user._id,
      });
      if (response.status === 200) {
        dispatch({ type: discoverPost, payload: response.data.posts });
      }
    }
  };

  const getUserPosts = async (userId, moreUserPost) => {
    if (moreUserPost === true) {
      const response = await axios.get(
        `${Base_url}userposts/${userId}?page=${moreUserPage}&limit=10`
      );
      // console.log(response);
      if (response.status === 200) {
        if (response.data.posts.length === 0) {
          dispatch({ type: noMoreaddUserPost });
        } else {
          dispatch({ type: addUserPost, payload: response.data.posts });
        }
      }
    } else {
      const response = await axios.get(`${Base_url}userposts/${userId}`);
      if (response.status === 200) {
        // console.log(response.data.posts);
        dispatch({ type: getuserPost, payload: response.data.posts });
      }
    }
  };

  const savedPost = async (data) => {
    // console.log(user._id);
    const response = await axios.post(`${Base_url}savedPost`, {
      postId: data._id,
      userId: user._id,
    });
    if (response.status === 200) {
      dispatch({ type: savedPosts, payload: data });
    }
  };

  return { getPosts, getAllPosts, getUserPosts, savedPost };
};
