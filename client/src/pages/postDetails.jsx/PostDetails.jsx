import { IconButton } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { FullPageLoader } from "../../components/loader/Loaders";
import { DimText, Heading1, Text1 } from "../../components/text/Texts";
import { Base_url, Img_url } from "../../constant";
import { UNSECURED } from "../../constant/Util";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IosShareIcon from "@mui/icons-material/IosShare";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { TextFields2 } from "../../components/textField/Textfields";
import { ThirdButton } from "../../components/button/Buttons";
import Comments from "../sharedComponents/comments/Comments";
import EditPostModal from "../sharedComponents/editPostModal/EditPostModal";
import {
  addParticularPostComment,
  getPost,
  likeParticularPost,
  unlikeParticularPost,
} from "../../redux/particularPostSlice";
import { Error } from "../../components/toast/Toasts";
import { PostUserProfile } from "../sharedComponents/avatar/UserProfile";

const PostDetails = () => {
  const { id } = useParams();
  const [particularPost, setParticularPost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  const [drop, setDrop] = useState("");
  const [edit, setEdit] = useState(false);
  const [postData, setPostData] = useState(null);
  const [content, setContent] = useState("");

  const user = UNSECURED(userData).user;

  const dispatch = useDispatch();

  const POST = useSelector((state) => state.prticularPost.Post);

  useEffect(() => {
    setParticularPost(POST);
  }, [POST]);
  //   console.log(POST);

  useEffect(() => {
    const GetDetails = async () => {
      const response = await axios.get(`${Base_url}detailposts/${id}`);
      dispatch({ type: getPost, payload: response.data.posts });
    };
    GetDetails();
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditPost = (data) => {
    // console.log(data);
    setDrop("");
    setEdit(true);
    setPostData(data);
  };

  const handleLike = async (data) => {
    const IsAlreadyLiked = data.likes.findIndex(
      (item) => item._id === user._id
    );
    // console.log(IsAlreadyLiked);

    if (IsAlreadyLiked !== -1) {
      dispatch({ type: unlikeParticularPost, payload: { user } });
      await axios.post(`${Base_url}unlikePost`, {
        userId: user._id,
        postId: data._id,
      });
    } else {
      dispatch({ type: likeParticularPost, payload: { user } });
      await axios.post(`${Base_url}likePost`, {
        userId: user._id,
        postId: data._id,
      });
    }
  };

  const handleComment = async (data) => {
    if (content.toLowerCase().replace(/ /g, "") === "") {
      Error("Please enter a valid comment");
    } else {
      const response = await axios.post(`${Base_url}comment`, {
        postId: data._id,
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
          type: addParticularPostComment,
          payload: {
            newComment,
          },
        });
        setContent("");
      }
    }
  };

  // console.log(particularPost);

  return (
    <div className="container mt-4 ">
      <div className="row ">
        {particularPost && typeof particularPost === "object" ? (
          particularPost && (
            <>
              <div className="card_post">
                <div className="card_header">
                  <div
                    style={{ gap: "15px" }}
                    className="d-flex align-items-center"
                  >
                    <div
                      style={{ gap: "15px" }}
                      className="my-2 d-flex align-items-center pointer"
                    >
                      <PostUserProfile
                        data={particularPost}
                        user={user}
                        imgSize={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                        }}
                      />
                      <div>
                        <Heading1
                          title={
                            particularPost &&
                            (particularPost?.user?._id === user?._id ||
                              particularPost?.user === user._id)
                              ? user?.fullname
                              : particularPost?.user?.fullname
                          }
                        />
                        <DimText
                          title={moment(particularPost.createdAt).fromNow()}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <OutsideClickHandler onOutsideClick={() => setDrop("")}> */}
                  {(particularPost?.user?._id === user?._id ||
                    particularPost?.user === user._id) && (
                    <div>
                      <IconButton
                        className="relative"
                        onClick={() =>
                          setDrop(drop === "" ? particularPost._id : "")
                        }
                      >
                        <MoreVertIcon sx={{ color: `var(--601)` }} />
                      </IconButton>

                      {drop === particularPost._id && (
                        <div className="drop_details">
                          <Text1
                            onClick={() => handleEditPost(particularPost)}
                            classNames="pointer my-2"
                            title="Edit Post"
                          />

                          <Text1
                            onClick={() => console.log("hy")}
                            classNames="pointer my-2"
                            title="Remove Post"
                          />
                          <Text1 classNames="pointer my-2" title="Copy Link" />
                        </div>
                      )}
                    </div>
                  )}

                  {/* </OutsideClickHandler> */}
                </div>
                <div className="container-fluid">
                  <div className="row p-2">
                    <div className="col-sm-6">
                      <Text1 title={particularPost?.content} />
                      <div className="d-flex align-items-center justify-content-center post_img_container pointer mb-4">
                        <Zoom>
                          <img
                            style={{ maxHeight: "300px", minHeight: "100px" }}
                            src={`${Img_url}${particularPost?.picture}`}
                            alt="post"
                            className="img-fluid"
                          />
                        </Zoom>

                        <div className="icon_btn_div">
                          {particularPost?.likes.find(
                            (item) =>
                              item._id === user._id ||
                              particularPost.likes.find(
                                (item) => item === user._id
                              )
                          ) ? (
                            <div
                              onClick={() => handleLike(particularPost)}
                              className="icon_div"
                            >
                              <FavoriteIcon sx={{ color: "red" }} />
                            </div>
                          ) : (
                            <div
                              onClick={() => handleLike(particularPost)}
                              className="icon_div"
                            >
                              <FavoriteBorderIcon />
                            </div>
                          )}

                          <div
                            // onClick={() => setMoreComm(!moreComm)}
                            className="icon_div"
                          >
                            <ChatBubbleOutlineIcon />
                          </div>
                          <div className="icon_div">
                            <IosShareIcon />
                          </div>
                        </div>
                        <div className="saved_btn_div">
                          <div className="icon_div">
                            <BookmarkBorderIcon />
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="d-flex align-items-center justify-content-between pt-1 px-1">
                          <Text1
                            classNames="pointer"
                            title={` ${particularPost.likes.length} likes`}
                          />
                          <Text1
                            classNames="pointer"
                            title={` ${particularPost.comments.length} comments`}
                          />
                        </div>{" "}
                        <form
                          style={{ gap: "10px" }}
                          className="mt-2 d-flex align-items-center"
                        >
                          <TextFields2
                            //   onClick={() => setContentVal(data._id)}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Comment"
                            // onClick={() => setOpen(true)}
                          />
                          <ThirdButton
                            title="Post"
                            type="submit"
                            onClick={() => handleComment(particularPost)}
                          />
                        </form>
                      </div>
                    </div>{" "}
                    <div
                      style={{ maxHeight: "80vh", overflow: "auto" }}
                      className="col-sm-6"
                    >
                      <Comments
                        user={user}
                        postId={particularPost._id}
                        comments={particularPost.comments}
                        moreComm={true}
                      />{" "}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        ) : (
          <>
            <FullPageLoader open={true} />
          </>
        )}
      </div>
      <EditPostModal open={edit} setOpen={setEdit} postData={postData} />
    </div>
  );
};

export default PostDetails;
