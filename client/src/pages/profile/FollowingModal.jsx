import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { MainHeading } from "../../components/text/Texts";

import SearchCard from "../../components/userSearchCard/SearchCard";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../components/button/Buttons";
import axios from "axios";
import { Base_url } from "../../constant";
import { UNSECURED } from "../../constant/Util";
import { useDispatch, useSelector } from "react-redux";
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

export default function FollowingModal({
  followingmodal,
  setFollowingModal,
  user,
}) {
  const [loading, setLoading] = React.useState(false);
  const handleClose = () => setFollowingModal(false);
  const userData = useSelector((state) => state.auth.userData);
  //   console.log(user?.following);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleNavigate = async (data) => {
    navigate(`/profile/${data._id}`);

    setFollowingModal && setFollowingModal(false);
  };

  //

  const unfollowUser = async (data) => {
    setLoading(true);
    const response = await axios.post(`${Base_url}user/${data._id}/unfollow`, {
      userId: UNSECURED(userData).user._id,
    });
    if (response.status === 200) {
      setLoading(false);

      dispatch({ type: isLogin, payload: response.data });
      await Error(response.data.msg);
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal
        open={followingmodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex align-items-center justify-content-between">
            <MainHeading title="Following" />{" "}
            <CancelIcon
              onClick={handleClose}
              className="pointer"
              sx={{ color: `var(--801)` }}
            />
          </div>
          <hr />
          {user?.following.length === 0 ? (
            <p>Sorry !, No user found</p>
          ) : (
            user?.following.map((data, i) => (
              <div
                key={i}
                className="d-flex align-items-center justify-content-between"
              >
                <SearchCard data={data} onClick={() => handleNavigate(data)} />
                {loading
                  ? ""
                  : user._id === UNSECURED(userData).user._id && (
                      <PrimaryButton
                        onClick={() => unfollowUser(data)}
                        title="Following"
                        sx={{
                          color: "#000 !important",
                          margin: "0px 0px 0px 0px !important",
                        }}
                      />
                    )}
              </div>
            ))
          )}
        </Box>
      </Modal>
    </div>
  );
}
