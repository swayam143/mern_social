import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import Validator from "validatorjs";
// import { Success, Validate } from "../../components/toast/Toasts";
// import { POST } from "../../constant/RequestAuthService";
import { TextFields2 } from "../../components/textField/Textfields";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { SecondaryButton } from "../../components/button/Buttons";
import { FullPageLoader } from "../../components/loader/Loaders";
import CancelIcon from "@mui/icons-material/Cancel";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { deepPurple } from "@mui/material/colors";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { UNSECURED } from "../../constant/Util";
import { Img_url } from "../../constant";
import Validator from "validatorjs";
import { Success, Validate } from "../../components/toast/Toasts";
import axios from "axios";
import { Base_url } from "../../constant/index";
import { isLogin } from "../../redux/authSlice";

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

export default function EditModal({ modal, setModal }) {
  const userData = useSelector((state) => state.auth.userData);
  const user = userData ? UNSECURED(userData).user : "";
  const [file, setFile] = React.useState();
  const [profile, setProfile] = React.useState(null);
  const handleClose = () => setModal(false);
  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState({
    fullname: user?.fullname,
    mobile: user?.mobile,
    username: user?.username,
    address: user?.address,
    gender: user?.gender,
    website: user?.website,
    story: user?.story,
  });

  const dispatch = useDispatch();

  // console.log(user._id);

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function handleChangeImage(e) {
    setProfile(e.target.files[0]);

    setFile(URL.createObjectURL(e.target.files[0]));
  }

  // console.log(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const checkdata = {
      mobile: "digits_between:10,13",
      // address: "required",
      // fullname: "required",
      // username: "required",
      // gender: "required",
      // website: "required",
      // story: "required",
    };

    const validation = new Validator(data, checkdata);

    if (validation.fails()) {
      Validate(validation);
    } else {
      try {
        const uploadData = new FormData();
        uploadData.append("mobile", data.mobile);
        uploadData.append("address", data.address);
        uploadData.append("fullname", data.fullname);
        uploadData.append("username", data.username);
        uploadData.append("gender", data.gender);
        uploadData.append("website", data.website);
        uploadData.append("story", data.story);
        uploadData.append("id", user._id);

        profile !== null && uploadData.append("picture", profile);
        // console.log(...uploadData);

        const response = await axios.post(`${Base_url}update`, uploadData);
        if (response.status === 200) {
          console.log(response.data);
          Success(response.data.mssg);
          dispatch({ type: isLogin, payload: response.data });
          setFile(null);
          handleClose();
        } else {
          Error(response.status.msg);
        }
      } catch (err) {
        Error(err);
      }
    }
  };

  const handelCancel = () => {
    setFile(null);
    setProfile(null);
  };

  // console.log(profile);
  return (
    <div>
      <Modal
        open={modal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CancelIcon
            onClick={handleClose}
            className="pointer"
            sx={{ color: `var(--801)`, float: "right" }}
          />
          <form
            style={{ background: "transparent" }}
            className="login_form "
            onSubmit={handleSubmit}
          >
            <div className="image-container mt-3 mb-2">
              <Zoom>
                {file ? (
                  <>
                    <Zoom>
                      <img src={file} className="user_img " alt="profile" />
                    </Zoom>
                    <IconButton
                      onClick={handelCancel}
                      size="small"
                      //   sx={{ background: `var(--500)` }}
                      className="close_icon"
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <CloseIcon sx={{ color: `#fff` }} />
                    </IconButton>
                  </>
                ) : user && user.picture !== "" ? (
                  <Zoom>
                    <img
                      className="user_img"
                      src={`${Img_url}${user.picture}`}
                      alt="users"
                    />
                  </Zoom>
                ) : (
                  <Avatar
                    className="user_img"
                    sx={{ bgcolor: deepPurple[500], fontSize: "50px" }}
                  >
                    {user?.fullname?.[0].toUpperCase()}
                  </Avatar>
                )}

                <IconButton
                  size="small"
                  //   sx={{ background: `var(--500)` }}
                  className="camer_pr_icon"
                  color="primary"
                  aria-label="upload picture"
                  component="label"
                >
                  <input
                    onChange={handleChangeImage}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  <CreateIcon sx={{ color: `#fff` }} />
                </IconButton>
              </Zoom>
            </div>
            <TextFields2
              type="text"
              classNames="mt-4"
              placeholder="Full Name"
              name="fullname"
              value={data.fullname}
              onChange={handleChange}
            />
            <TextFields2
              type="text"
              classNames="mt-4"
              placeholder="User Name"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
            <TextFields2
              type="number"
              classNames="mt-4"
              placeholder="mobile"
              name="mobile"
              value={data.mobile}
              onChange={handleChange}
            />
            <TextFields2
              type="text"
              classNames="mt-4"
              placeholder=" Address"
              name="address"
              value={data.address}
              onChange={handleChange}
            />

            <TextFields2
              type="text"
              classNames="mt-4"
              placeholder=" Website"
              name="website"
              value={data.website}
              onChange={handleChange}
            />
            <TextFields2
              type="text"
              classNames="mt-4"
              placeholder=" Story"
              name="story"
              value={data.story}
              onChange={handleChange}
            />

            <div className="d-flex justify-content-center mt-3 ">
              {" "}
              <FormControl>
                <RadioGroup
                  row
                  // aria-labelledby="demo-row-radio-buttons-group-label"
                  // name="row-radio-buttons-group"
                  value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                  // name="gender"
                >
                  {" "}
                  <FormControlLabel
                    value="male"
                    control={
                      <Radio
                        sx={{
                          color: `var(--700)`,
                          "&.Mui-checked": {
                            color: `var(--500)`,
                          },
                        }}
                      />
                    }
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={
                      <Radio
                        sx={{
                          color: `var(--700)`,
                          "&.Mui-checked": {
                            color: `var(--500)`,
                          },
                        }}
                      />
                    }
                    label="Female"
                  />
                  <FormControlLabel
                    value="other"
                    control={
                      <Radio
                        sx={{
                          color: `var(--700)`,
                          "&.Mui-checked": {
                            color: `var(--500)`,
                          },
                        }}
                      />
                    }
                    label="Other"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <SecondaryButton
              title="Update"
              classNames="w-100 my-3"
              type="submit"
            />

            {/* <Button onClick={() => setOpen(!open)}>show</Button> */}
            <FullPageLoader open={open} setOpen={setOpen} />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
