import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FullPageLoader } from "../../components/loader/Loaders";
import { Base_url, Img_url } from "../../constant";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { DimText, Heading1, Text1 } from "../../components/text/Texts";
import { deepPurple } from "@mui/material/colors";
import moment from "moment";
import { useHomeFunctanility } from "./useHomeApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import IosShareIcon from "@mui/icons-material/IosShare";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import EditPostModal from "./EditPostModal";
import { likePost, unlikePost } from "../../redux/postSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { TextFields2 } from "../../components/textField/Textfields";
import { ThirdButton } from "../../components/button/Buttons";

const Posts = ({ user }) => {
  const { getPosts } = useHomeFunctanility();
  const [drop, setDrop] = useState("");
  const [edit, setEdit] = useState(false);
  const [postData, setPostData] = useState(null);

  const allPosts = useSelector((state) => state.post.allPosts);

  useEffect(() => {
    getPosts(user);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(allPosts);

  const handleEditPost = (data) => {
    // console.log(data);
    setDrop("");
    setEdit(true);
    setPostData(data);
  };

  const dispatch = useDispatch();

  const handleLike = async (data) => {
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
      // console.log(response);
    }
  };

  console.log(allPosts);

  const handleComment = (e) => {
    e.preventDefault();
    console.log("hy");
  };

  return (
    <div>
      {allPosts && typeof allPosts === "object" ? (
        allPosts.length === 0 ? (
          <h1>No Post Found</h1>
        ) : (
          <>
            {allPosts &&
              allPosts.map((data, i) => (
                <div className="card_post" key={i}>
                  <div className="card_header">
                    <div
                      style={{ gap: "15px" }}
                      className="d-flex align-items-center"
                    >
                      <div
                        style={{ gap: "15px" }}
                        className="my-2 d-flex align-items-center pointer"
                      >
                        {data && data?.user?.picture !== "" ? (
                          <Zoom>
                            <img
                              style={{
                                width: "40px",
                                height: "40px",
                                borderRadius: "50%",
                              }}
                              className="img-fluid "
                              src={` ${Img_url}${
                                data &&
                                (data?.user?._id === user?._id ||
                                  data?.user === user._id)
                                  ? user?.picture
                                  : data?.user?.picture
                              }`}
                              alt="users"
                            />{" "}
                          </Zoom>
                        ) : (
                          <Avatar sx={{ bgcolor: deepPurple[500] }}>
                            {data &&
                            (data?.user?._id === user?._id ||
                              data?.user === user._id)
                              ? user?.fullname?.[0].toUpperCase()
                              : data?.user?.fullname?.[0].toUpperCase()}
                          </Avatar>
                        )}
                        <div>
                          <Heading1
                            title={
                              data &&
                              (data?.user?._id === user?._id ||
                                data?.user === user._id)
                                ? user?.fullname
                                : data?.user?.fullname
                            }
                          />
                          <DimText title={moment(data.createdAt).fromNow()} />
                        </div>
                      </div>
                    </div>
                    {/* <OutsideClickHandler onOutsideClick={() => setDrop("")}> */}
                    {(data?.user?._id === user?._id ||
                      data?.user === user._id) && (
                      <div>
                        <IconButton
                          className="relative"
                          onClick={() => setDrop(drop === "" ? data._id : "")}
                        >
                          <MoreVertIcon sx={{ color: `var(--601)` }} />
                        </IconButton>

                        {drop === data._id && (
                          <div className="drop_details">
                            <Text1
                              onClick={() => handleEditPost(data)}
                              classNames="pointer my-2"
                              title="Edit Post"
                            />

                            <Text1
                              onClick={() => console.log("hy")}
                              classNames="pointer my-2"
                              title="Remove Post"
                            />
                            <Text1
                              classNames="pointer my-2"
                              title="Copy Link"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {/* </OutsideClickHandler> */}
                  </div>
                  <Text1 title={data?.content} />
                  <div className="d-flex align-items-center justify-content-center post_img_container ">
                    <Zoom>
                      <img
                        style={{ maxHeight: "300px", minHeight: "100px" }}
                        src={`${Img_url}${data?.picture}`}
                        alt="post"
                        className="img-fluid"
                      />
                    </Zoom>
                    <div className="icon_btn_div">
                      {data.likes.find(
                        (item) =>
                          item._id === user._id ||
                          data.likes.find((item) => item === user._id)
                      ) ? (
                        <div
                          onClick={() => handleLike(data)}
                          className="icon_div"
                        >
                          <FavoriteIcon sx={{ color: "red" }} />
                        </div>
                      ) : (
                        <div
                          onClick={() => handleLike(data)}
                          className="icon_div"
                        >
                          <FavoriteBorderIcon />
                        </div>
                      )}

                      <div className="icon_div">
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
                  <div className="mt-4">
                    <div className="d-flex align-items-center justify-content-between pt-1 px-1">
                      <Text1
                        classNames="pointer"
                        title={` ${data.likes.length} likes`}
                      />
                      <Text1 classNames="pointer" title="0 comments" />
                    </div>
                  </div>

                  <form
                    onSubmit={handleComment}
                    style={{ gap: "10px" }}
                    className="mt-2 d-flex align-items-center"
                  >
                    <TextFields2
                      placeholder="Comment"
                      // onClick={() => setOpen(true)}
                    />
                    <ThirdButton title="Post" type="submit" />
                  </form>
                </div>
              ))}
          </>
        )
      ) : (
        <FullPageLoader open={true} />
      )}
      <EditPostModal open={edit} setOpen={setEdit} postData={postData} />

      {/* <FullPageLoader open={loading} setOpen={setLoading} /> */}
    </div>
  );
};

export default Posts;
