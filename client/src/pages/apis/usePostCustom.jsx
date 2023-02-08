import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// import { deletePosts } from "../../redux/postSlice";
import { Base_url } from "../../constant";
import { UNSECURED } from "../../constant/Util";
import { Success } from "../../components/toast/Toasts";
import {
  addComment,
  deletePosts,
  likeUpdatedPost,
} from "../../redux/updtedPostSlice";

export const usePostFunctanilty = (
  setDrop,
  setEdit,
  setPostData,
  content,
  setContent
) => {
  const userData = useSelector((state) => state.auth.userData);
  const user = UNSECURED(userData).user;

  const dispatch = useDispatch();

  //
  // EDIT POST
  //
  const handleEditPost = (data) => {
    setDrop("");
    setEdit(true);
    setPostData(data);
  };

  //
  // LIKE POST
  //

  const HandleLike = async (data) => {
    dispatch({ type: likeUpdatedPost, payload: { data, user } });
  };

  const handleComment = async (post) => {
    if (content.toLowerCase().replace(/ /g, "") === "") {
      Success("Please enter a valid comment");
    } else {
      const response = await axios.post(`${Base_url}comment`, {
        postId: post._id,
        content,
        user: user._id,
      });
      if (response.status === 200) {
        const newComment = {
          content,
          likes: [],
          user,
          reply: [],
          createdAt: new Date().toISOString(),
          _id: response.data.newComment._id,
        };
        dispatch({
          type: addComment,
          payload: {
            newComment,
            post,
          },
        });
        setContent("");
      }
    }
  };

  const deletePost = async (data) => {
    await axios.post(`${Base_url}delposts`, {
      userId: user._id,
      postId: data._id,
    });
    await dispatch({ type: deletePosts, payload: data });
  };

  return { handleEditPost, HandleLike, handleComment, deletePost };
};
