import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CancelIcon from "@mui/icons-material/Cancel";
import { MainHeading } from "../../components/text/Texts";
import SearchCard from "../../components/userSearchCard/SearchCard";
import { useNavigate } from "react-router-dom";

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

export default function FollowersModal({
  followermodal,
  setFollowerModal,
  user,
}) {
  const handleClose = () => setFollowerModal(false);

  const navigate = useNavigate();
  const handleNavigate = async (data) => {
    navigate(`/profile/${data._id}`);

    setFollowerModal && setFollowerModal(false);
  };

  return (
    <div>
      <Modal
        open={followermodal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="d-flex align-items-center justify-content-between">
            <MainHeading title="Followers" />{" "}
            <CancelIcon
              onClick={handleClose}
              className="pointer"
              sx={{ color: `var(--801)` }}
            />
          </div>
          <hr />
          {user?.followers.length === 0 ? (
            <p>Sorry !, No user found</p>
          ) : (
            user?.followers.map((data, i) => (
              <div key={i}>
                <SearchCard data={data} onClick={() => handleNavigate(data)} />
              </div>
            ))
          )}
        </Box>
      </Modal>
    </div>
  );
}
