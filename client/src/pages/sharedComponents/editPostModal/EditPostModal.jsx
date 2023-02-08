import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { MainHeading } from "../../../components/text/Texts";
import { TextArea1 } from "../../../components/textField/Textfields";
import { Button } from "@mui/material";
import { SecondaryButton } from "../../../components/button/Buttons";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Validator from "validatorjs";
import { Success, Validate } from "../../../components/toast/Toasts";
import axios from "axios";
import { Base_url, Img_url } from "../../../constant";
import { useDispatch } from "react-redux";
import { updateUpdatedPost } from "../../../redux/updtedPostSlice";

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

export default function EditPostModal({ open, setOpen, postData }) {
  const [file, setFile] = React.useState();
  const [images, setImages] = React.useState();
  const handleClose = () => setOpen(false);
  const [content, setContent] = React.useState("");
  const [previousPicture, setPreviousPicture] = React.useState("");
  const dispatch = useDispatch();

  // const indV = useSelector((state) => state.post.indexV);
  // console.log(indV);

  React.useEffect(() => {
    setContent(postData?.content);
    setPreviousPicture(postData?.picture);
  }, [postData]);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    setImages(e.target.files[0]);
  }
  const handleCancel = () => {
    setFile(null);
    setImages(null);
  };

  // console.log(images);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkdata = {
      content: "required",
      // picture: "required",
    };

    const validation = new Validator(
      { content, picture: images ? images : postData?.picture },
      checkdata
    );

    if (validation.fails()) {
      Validate(validation);
    } else {
      try {
        const uploadData = new FormData();
        uploadData.append("content", content);
        uploadData.append("postId", postData._id);
        uploadData.append("picture", images ? images : postData?.picture);

        const response = await axios.post(
          `${Base_url}updatedposts`,
          uploadData
        );
        if (response.status === 200) {
          // console.log(response.data.upDatedPost);
          Success(response.data.msg);

          dispatch({
            type: updateUpdatedPost,
            payload: response.data.upDatedPost,
          });

          handleClose();

          setContent("");
          setImages(null);
          setPreviousPicture("");
        } else {
          Error(response.status.msg);
        }
      } catch (err) {
        Error(err);
      }
    }
  };
  //   console.log(postData.content);

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
            <MainHeading title="Edit Post" />{" "}
            <CancelIcon
              onClick={handleClose}
              className="pointer"
              sx={{ color: `var(--801)` }}
            />
          </div>
          <hr />
          <form onSubmit={handleSubmit} className="mt-3">
            <TextArea1
              value={content}
              name="content"
              onChange={(e) => setContent(e.target.value)}
              //   placeholder={`${user?.fullname}, What's on your Mind`}
            />
            {previousPicture && (
              <div className="relative d-flex justify-content-center pt-5">
                <CancelIcon
                  onClick={() => setPreviousPicture("")}
                  className="pointer image_prev_upload"
                  sx={{ color: `var(--801)`, float: "right" }}
                />
                <Zoom>
                  <img
                    src={`${Img_url}${previousPicture}`}
                    alt="file"
                    className="img-fluid "
                  />
                </Zoom>
              </div>
            )}

            {!file && previousPicture === "" ? (
              <div className="relative  pt-5">
                <div className="upload_img_div ">
                  <CancelIcon
                    onClick={() => setPreviousPicture(postData?.picture)}
                    className="pointer image_prev_upload "
                    sx={{ color: `var(--801)`, float: "right" }}
                  />
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
              </div>
            ) : (
              previousPicture === "" && (
                <div className="relative d-flex justify-content-center pt-5">
                  <CancelIcon
                    onClick={handleCancel}
                    className="pointer image_prev_upload"
                    sx={{ color: `var(--801)`, float: "right" }}
                  />
                  <Zoom>
                    <img src={file} alt="file" className="img-fluid " />
                  </Zoom>
                </div>
              )
            )}

            <SecondaryButton
              title="Update"
              classNames="w-100 mt-4"
              type="submit"
            />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
