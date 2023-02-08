import * as React from "react";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { TextArea1 } from "../../../../components/textField/Textfields";
import { SecondaryButton } from "../../../../components/button/Buttons";
import Validator from "validatorjs";
import { Success, Validate } from "../../../../components/toast/Toasts";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Base_url } from "../../../../constant";
import {
  addPostComment,
  upDateReplyComment,
} from "../../../../redux/updtedPostSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "  #ccc 0 5px 16px",
  p: 1,
  borderRadius: "6px",
  maxWidth: "90%",
};

export default function EditReplyCommentModal({
  edit,
  setEdit,
  modalData,
  dataChange,
  postId,
  user,
  post,
  commentId,
}) {
  const [content, setContent] = React.useState("");
  const handleClose = () => setEdit(false);
  const [newCommentAdd, setNewCommentAdd] = React.useState("");
  const updatedPosts = useSelector((state) => state.updatedPost.updatedPosts);

  //user:user._id, commentId:modalData._id

  React.useEffect(() => {
    if (modalData) {
      setContent(modalData?.content);
    }
  }, [dataChange]); // eslint-disable-line react-hooks/exhaustive-deps

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const checkdata = {
      comment: "required",
    };

    const validation = new Validator({ comment: content }, checkdata);

    if (validation.fails()) {
      Validate(validation);
    } else {
      const findpostIndex = updatedPosts.findIndex(
        (item) => item._id === post._id
      );

      if (findpostIndex === -1) {
        setNewCommentAdd(modalData);
        dispatch({
          type: addPostComment,
          payload: { post },
        });
      } else {
        dispatch({
          type: upDateReplyComment,
          payload: { post, data: modalData, user, content, commentId },
        });
      }

      // dispatch({
      //   type: upDateReplyComment,
      //   payload: { postId, data: modalData, user, content, commentId },
      // });

      handleClose();
      const response = await axios.post(`${Base_url}updateReplycomment`, {
        replyId: modalData._id,
        content,
      });
      if ((response.status = 200)) {
        Success(response.data.mssg);
        handleClose();
      }
    }
  };

  React.useEffect(() => {
    if (newCommentAdd) {
      dispatch({
        type: upDateReplyComment,
        payload: { post, data: newCommentAdd, user, content, commentId },
      });
    }
  }, [newCommentAdd]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Modal
        open={edit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextArea1
            value={content}
            name="content"
            onChange={(e) => setContent(e.target.value)}
            //   placeholder={`${user?.fullname}, What's on your Mind`}
          />
          <SecondaryButton
            onClick={handleSubmit}
            title="Update"
            classNames="w-100 mt-4"
            type="submit"
          />
        </Box>
      </Modal>
    </div>
  );
}
