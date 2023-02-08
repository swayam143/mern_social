import axios from "axios";
import { useDispatch } from "react-redux";
import { Base_url } from "../../constant";
import { discoverPost } from "../../redux/discoverPostsSlice";
import { getAllPost } from "../../redux/postSlice";
import { getuserPost } from "../../redux/userPostSlice";

export const useHomeFunctanility = () => {
  const dispatch = useDispatch();
  const getPosts = async (user) => {
    const response = await axios.get(`${Base_url}posts/${user._id}`);
    if (response.status === 200) {
      //   console.log(response.data.posts);
      dispatch({ type: getAllPost, payload: response.data.posts });
    }
  };

  const getAllPosts = async (user) => {
    const response = await axios.get(`${Base_url}posts`);
    if (response.status === 200) {
      // console.log(response.data.posts);
      dispatch({ type: discoverPost, payload: response.data.posts });
    }
  };

  const getUserPosts = async (userId) => {
    const response = await axios.get(`${Base_url}userposts/${userId}`);
    if (response.status === 200) {
      console.log(response.data.posts);
      dispatch({ type: getuserPost, payload: response.data.posts });
    }
  };

  return { getPosts, getAllPosts, getUserPosts };
};
