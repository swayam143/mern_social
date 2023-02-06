import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  unlikePost,
  likePost,
  addComment,
  deletePosts,
} from "../../redux/postSlice";
import { Base_url } from "../../constant";
import { UNSECURED } from "../../constant/Util";
import { Success } from "../../components/toast/Toasts";

export const usePostFunctanilty = (
  setDrop,
  setEdit,
  setPostData,
  content,
  setContent
) => {
  const allPosts = useSelector((state) => state.post.allPosts);
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
    // console.log(data);
    //
    //Fid index of pparticular post
    //
    const findpostIndex = allPosts.findIndex((item) => item._id === data._id);
    //
    //Is likes already exist
    //

    const IsAlreadyLiked = data.likes.findIndex(
      (item) => item._id === user._id
    );

    if (IsAlreadyLiked !== -1) {
      dispatch({ type: unlikePost, payload: { findpostIndex, user } });
      await axios.post(`${Base_url}unlikePost`, {
        userId: user._id,
        postId: data._id,
      });
    } else {
      dispatch({ type: likePost, payload: { findpostIndex, user } });
      await axios.post(`${Base_url}likePost`, {
        userId: user._id,
        postId: data._id,
      });
    }
  };

  const handleComment = async (post) => {
    if (content.toLowerCase().replace(/ /g, "") === "") {
      Success("Please enter a valid comment");
    } else {
      const findpostIndex = allPosts.findIndex((item) => item._id === post._id);

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
            findpostIndex,
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
    dispatch({ type: deletePosts, payload: data });
  };

  return { handleEditPost, HandleLike, handleComment, deletePost };
};
