import * as React from "react";
import Box from "@mui/material/Box";
import { Modal } from "@mui/material";
import { TextArea1 } from "../../components/textField/Textfields";
import { SecondaryButton } from "../../components/button/Buttons";
import Validator from "validatorjs";
import { Validate } from "../../components/toast/Toasts";
import { useSelector } from "react-redux";

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

export default function EditCommentModal({
  edit,
  setEdit,
  modalData,
  dataChange,
  postId,
}) {
  const [content, setContent] = React.useState("");
  const [newAllPost, setNewAllPost] = React.useState([]);
  const handleClose = () => setEdit(false);

  const allPosts = useSelector((state) => state.post.allPosts);
  //   console.log(allPosts);

  React.useEffect(() => {
    if (modalData) {
      setContent(modalData?.content);
    }
  }, [dataChange]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async () => {
    const checkdata = {
      comment: "required",
    };

    const validation = new Validator({ comment: content }, checkdata);

    if (validation.fails()) {
      Validate(validation);
    } else {
      //
      //Find index of pparticular post
      //
      const findpostIndex = allPosts.findIndex((item) => item._id === postId);
      //
      //Find index of particular comment
      //
      //   const findcommIndex = allPosts[findpostIndex].comments.findIndex(
      //     (item) => item._id === modalData._id
      //   );

      const newAllPost = [...allPosts];

      const checkedArray = newAllPost.map((x) => {
        const valuesChangeCheck = x._id === postId;
        if (valuesChangeCheck) {
          x.comments.map((data) => {
            const valuesChangeCheck = data._id === modalData._id;

            if (valuesChangeCheck) {
              data.content = "fgdg";
              console.log(data);
            }
            return data;
          });
        }
        return x;
      });
      console.log(checkedArray);
      setNewAllPost(checkedArray);
    }
  };

  // console.log(newAllPost);
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
