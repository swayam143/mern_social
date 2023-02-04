import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Text1 } from "../../../components/text/Texts";
import { Base_url, Img_url } from "../../../constant";
import moment from "moment";
import { useState } from "react";
// import AllCommentModal from "./AllCommentModal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditCommentModal from "./modals/EditCommentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComments,
  likeComment,
  replyComments,
} from "../../../redux/postSlice";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { TextFields2 } from "../../../components/textField/Textfields";
import { ThirdButton } from "../../../components/button/Buttons";
import { Error } from "../../../components/toast/Toasts";
import EditReplyCommentModal from "./modals/EditReplyComment";
import {
  deleteParticularPostComments,
  likeParticularPostComment,
  replyParticularPostComments,
} from "../../../redux/particularPostSlice";
import { useNavigate } from "react-router-dom";

// import axios from "axios";

const Comments = ({ comments, moreComm, user, postId }) => {
  // const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [drop, setDrop] = useState("");
  const [dataChange, setDataChange] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [reply, setReply] = useState(null);
  const allPosts = useSelector((state) => state.post.allPosts);
  const [content, setContent] = useState("");
  const [editReply, setEditReply] = useState(false);
  const [commentId, setCommentId] = useState("");

  const dispatch = useDispatch();

  const handleLike = async (data) => {
    await axios.post(`${Base_url}likeUnlike`, {
      commentId: data._id,
      user: user._id,
    });
    if (moreComm === true) {
      dispatch({ type: likeParticularPostComment, payload: { data, user } });
    } else {
      dispatch({ type: likeComment, payload: { postId, data, user } });
    }
  };

  const replyComment = async (data) => {
    if (content.toLowerCase().replace(/ /g, "") === "") {
      Error("Please enter a valid content");
    } else {
      await axios.post(`${Base_url}replyComment`, {
        content,
        commentId: data._id,
        user: user._id,
      });
      if (moreComm === true) {
        console.log(true);
        dispatch({
          type: replyParticularPostComments,
          payload: { data, user, content },
        });
      } else {
        dispatch({
          type: replyComments,
          payload: { postId, data, user, content },
        });
      }
      setContent("");
    }
  };
  // dispatch({ type: likeComment, payload: { postId, data, user } });

  const editCmmment = (data) => {
    setModalData(data);
    setEdit(true);
    setDataChange(!dataChange);
  };
  const editReplyCmmment = ({ data, item }) => {
    // console.log(data, item);
    setCommentId(data);
    setModalData(item);
    setEditReply(true);
    setDataChange(!dataChange);
  };

  // console.log(reply);

  const deleteComment = async (data) => {
    await axios.post(`${Base_url}deleteComment`, {
      commentId: data._id,
    });
    if (moreComm === true) {
      dispatch({ type: deleteParticularPostComments, payload: { data } });
      // console.log(data);
    } else {
      const findpostIndex = allPosts.findIndex((item) => item._id === postId);
      dispatch({ type: deleteComments, payload: { findpostIndex, data } });
    }
  };

  // console.log(allPosts);
  const navigate = useNavigate();
  return (
    <div>
      {comments?.length > 0 &&
        comments
          .slice(0, `${moreComm === true ? comments.length : 1}`)
          .map((data, i) => (
            <div key={i} className="mt-2">
              <div style={{ gap: "10px" }} className="d-flex">
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
                    (data?.user?._id === user?._id || data?.user === user._id)
                      ? user?.fullname?.[0].toUpperCase()
                      : data?.user?.fullname?.[0].toUpperCase()}
                  </Avatar>
                )}
                <div style={{ flexGrow: 1 }}>
                  <Text1
                    title={
                      data &&
                      (data?.user?._id === user?._id || data?.user === user._id)
                        ? user?.fullname
                        : data?.user?.fullname
                    }
                  />
                  <div
                    style={{ padding: "10px" }}
                    className="post_img_container"
                  >
                    <div className="  d-flex align-items-center justify-content-between flex-wrap">
                      <div>
                        <p className="fs_12">{data?.content}</p>
                        <div
                          style={{ gap: "10px" }}
                          className="d-flex align-items-center"
                        >
                          <p className="fs_10">
                            {" "}
                            {moment(data.createdAt).fromNow()}
                          </p>
                          <Text1 title={`${data?.likes?.length} likes`} />
                          <Text1
                            classNames="pointer"
                            title={`${data?.reply?.length || "0"} Reply`}
                            onClick={() =>
                              setReply(reply === data._id ? null : data._id)
                            }
                          />
                        </div>
                      </div>

                      <div
                        style={{ flexGrow: 1 }}
                        className=" d-flex align-items-center justify-content-end"
                      >
                        {data?.likes?.find((item) => item._id === user._id) ? (
                          <FavoriteIcon
                            onClick={() => handleLike(data)}
                            sx={{ fontSize: "1em", color: "red" }}
                            className="pointer "
                          />
                        ) : (
                          <FavoriteBorderIcon
                            // onClick={() => dispatch({ type: comm })}
                            onClick={() => handleLike(data)}
                            sx={{ fontSize: "1em" }}
                            className="pointer "
                          />
                        )}

                        {user?._id === data?.user?._id && (
                          <div
                            className="relative"
                            onClick={() => setDrop(drop === "" ? data._id : "")}
                          >
                            <MoreVertIcon
                              style={{ marginTop: "-4px" }}
                              sx={{ fontSize: "1em" }}
                              className="pointer ms-2"
                            />
                            {drop === data._id && (
                              <div
                                style={{ width: "73px" }}
                                className="drop_details"
                              >
                                <Text1
                                  onClick={
                                    () => editCmmment(data)
                                    // setEdit(true)
                                  }
                                  classNames="pointer my-2"
                                  title="Edit "
                                />

                                <Text1
                                  onClick={() => deleteComment(data)}
                                  classNames="pointer my-2"
                                  title="Remove "
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    {data?.reply?.length > 0 &&
                      data.reply
                        .slice(
                          0,
                          `${moreComm === true ? data.reply.length : 1}`
                        )
                        .map((item, i) => (
                          <div key={i}>
                            {" "}
                            <hr className="my-2" />
                            <div className="  d-flex align-items-center justify-content-between flex-wrap">
                              <div style={{ gap: "10px" }} className="d-flex ">
                                {" "}
                                {item && item?.user?.picture !== "" ? (
                                  <Zoom>
                                    <img
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                      }}
                                      className="img-fluid "
                                      src={` ${Img_url}${
                                        item &&
                                        (item?.user?._id === user?._id ||
                                          item?.user === user._id)
                                          ? user?.picture
                                          : item?.user?.picture
                                      }`}
                                      alt="users"
                                    />{" "}
                                  </Zoom>
                                ) : (
                                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                                    {item &&
                                    (item?.user?._id === user?._id ||
                                      item?.user === user._id)
                                      ? user?.fullname?.[0].toUpperCase()
                                      : item?.user?.fullname?.[0].toUpperCase()}
                                  </Avatar>
                                )}
                                <div>
                                  <Text1
                                    title={
                                      item &&
                                      (item?.user?._id === user?._id ||
                                        item?.user === user._id)
                                        ? user?.fullname
                                        : item?.user?.fullname
                                    }
                                  />
                                  <p className="fs_12">{item?.content}</p>
                                  <div
                                    style={{ gap: "10px" }}
                                    className="d-flex align-items-center"
                                  >
                                    <p className="fs_10">
                                      {" "}
                                      {moment(item.createdAt).fromNow()}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {user?._id === item?.user?._id && (
                                <div
                                  className="relative"
                                  onClick={() =>
                                    setDrop(drop === "" ? item._id : "")
                                  }
                                >
                                  <MoreVertIcon
                                    style={{ marginTop: "-4px" }}
                                    sx={{ fontSize: "1em" }}
                                    className="pointer ms-2"
                                  />
                                  {drop === item._id && (
                                    <div
                                      style={{ width: "73px" }}
                                      className="drop_details"
                                    >
                                      <Text1
                                        onClick={
                                          () => editReplyCmmment({ data, item })
                                          // setEdit(true)
                                        }
                                        classNames="pointer my-2"
                                        title="Edit "
                                      />

                                      <Text1
                                        onClick={() => deleteComment(data)}
                                        classNames="pointer my-2"
                                        title="Remove "
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    {reply === data._id && (
                      <div
                        style={{ gap: "10px" }}
                        className="mt-2 d-flex align-items-center flex-wrap"
                      >
                        <TextFields2
                          // onClick={() => setContentVal(data._id)}
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                          placeholder="Reply here..."
                          // onClick={() => setOpen(true)}
                        />{" "}
                        <ThirdButton
                          classNames="ms-auto"
                          title="Reply"
                          type="submit"
                          onClick={() => replyComment(data)}
                        />
                      </div>
                    )}
                  </div>
                  {(comments?.length > 1 || comments?.[0]?.reply?.length > 1) &&
                    moreComm === false && (
                      <Text1
                        onClick={() => navigate(`/post/${postId}`)}
                        style={{ color: `var(--600)`, textAlign: "right" }}
                        title="View More"
                        classNames="mt-2 me-1 pointer"
                      />
                    )}
                </div>
              </div>
            </div>
          ))}
      {/* <AllCommentModal
        open={open}
        setOpen={setOpen}
        comments={comments}
        user={user}
      /> */}
      <EditCommentModal
        edit={edit}
        setEdit={setEdit}
        comments={comments}
        setModalData={setModalData}
        modalData={modalData}
        dataChange={dataChange}
        postId={postId}
        user={user}
        moreComm={moreComm}
      />
      <EditReplyCommentModal
        edit={editReply}
        setEdit={setEditReply}
        comments={comments}
        setModalData={setModalData}
        modalData={modalData}
        dataChange={dataChange}
        postId={postId}
        user={user}
        commentId={commentId}
      />
    </div>
  );
};

export default Comments;
