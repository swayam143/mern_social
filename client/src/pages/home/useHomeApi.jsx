import axios from "axios";
import { useDispatch } from "react-redux";
import { Base_url } from "../../constant";
import { getAllPost } from "../../redux/postSlice";

export const useHomeFunctanility = () => {
  const dispatch = useDispatch();
  const getPosts = async (user) => {
    const response = await axios.get(`${Base_url}posts/${user._id}`);
    if (response.status === 200) {
      //   console.log(response.data.posts);
      dispatch({ type: getAllPost, payload: response.data.posts });
    }
  };

  return { getPosts };
};
