import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { MainHeading } from "../../components/text/Texts";
import { TextArea1 } from "../../components/textField/Textfields";
import { Button } from "@mui/material";
import { SecondaryButton } from "../../components/button/Buttons";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Validator from "validatorjs";
import { Success, Validate } from "../../components/toast/Toasts";
import axios from "axios";
import { Base_url } from "../../constant";
import { addNewPost } from "../../redux/postSlice";
import { useDispatch } from "react-redux";

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

export default function PostModal({ open, setOpen, user }) {
  const [file, setFile] = React.useState();
  const [images, setImages] = React.useState();
  const handleClose = () => setOpen(false);
  const [content, setContent] = React.useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImages(e.target.files[0]);
  }
  const handleCancel = () => {
    setFile(null);
    setImages(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkdata = {
      content: "required",
      picture: "required",
    };

    const validation = new Validator({ content, picture: images }, checkdata);

    if (validation.fails()) {
      Validate(validation);
    } else {
      try {
        const uploadData = new FormData();
        uploadData.append("content", content);
        uploadData.append("picture", images);
        uploadData.append("user", user._id);

        const response = await axios.post(`${Base_url}posts`, uploadData);
        if (response.status === 200) {
          handleClose();
          dispatch({ type: addNewPost, payload: response.data.newPost });
          Success(response.data.msg);
          setFile(null);
          setContent("");

          // getPosts();
        } else {
          Error(response.status.msg);
        }
      } catch (err) {
        Error(err);
      }
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex align-items-center justify-content-between">
            <MainHeading title="Create Post" />{" "}
            <CancelIcon
              onClick={handleClose}
              className="pointer"
              sx={{ color: `var(--801)` }}
            />
          </div>
          <hr />
          <form onSubmit={handleSubmit}>
            <TextArea1
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              placeholder={`${user?.fullname}, What's on your Mind`}
            />

            {!file ? (
              <div className="upload_img_div">
                <Button
                  variant="contained"
                  component="label"
                  className={` third_btn`}
                >
                  Upload
                  <input
                    hidden
                    accept="image/*"
                    multiple
                    type="file"
                    onChange={handleChange}
                  />
                </Button>
              </div>
            ) : (
              <div className="relative d-flex justify-content-center pt-5">
                <CancelIcon
                  onClick={handleCancel}
                  className="pointer image_prev_upload"
                  sx={{ color: `var(--801)`, float: "right" }}
                />
                <Zoom>
                  <img
                    src={file}
                    alt="file"
                    className="img-fluid "
                    style={{ maxHeight: "300px" }}
                  />
                </Zoom>
              </div>
            )}

            <SecondaryButton
              title="Post"
              classNames="w-100 mt-4"
              type="submit"
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
