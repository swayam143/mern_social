import { Avatar, IconButton } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { SecondaryButton } from "../../components/button/Buttons";
import { FullPageLoader } from "../../components/loader/Loaders";
import { MainHeading, Text1 } from "../../components/text/Texts";
import { Error } from "../../components/toast/Toasts";
import { GET } from "../../constant/RequestAuthService";
import { UNSECURED } from "../../constant/Util";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import "./profile.css";
import EditModal from "./EditModal";
import { Img_url } from "../../constant";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const { id } = useParams();

  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        setOpen(true);
        const response = await GET("user", { id: id });
        if (response.status === 200) {
          setUser(response.data.users);
          setOpen(false);
        } else {
          Error(response.status.mssg);
          setOpen(false);
        }
      } catch (err) {
        Error(err);
        setOpen(false);
      }
    };
    if (id === UNSECURED(userData).user._id) {
      setUser(UNSECURED(userData).user);
    } else {
      getUser();
    }
  }, [id, userData, open]); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(user);

  return (
    <>
      <div className="card-container relative">
        <div className="">
          <div className="image-container mt-3 mb-2">
            {/* <img src="profile.jpg" /> */}
            <Zoom>
              {user && user.picture !== "" ? (
                <img
                  className="img-fluid user_img"
                  src={`${Img_url}${user?.picture}`}
                  alt="users"
                />
              ) : (
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {user && user?.fullname?.[0].toUpperCase()}
                </Avatar>
              )}
            </Zoom>
          </div>
        </div>

        <div className="lower-container">
          <div>
            <MainHeading title={user?.fullname.toUpperCase()} />
            <p className="fs_18">@{user?.username}</p>
            <p className="fs_14">{user?.email}</p>
            {UNSECURED(userData).user._id !== id && (
              <SecondaryButton title="Follow" classNames="mx-auto mt-2" />
            )}
          </div>
          <div
            style={{ gap: "20px" }}
            className="d-flex align-items-center justify-content-center mt-3"
          >
            <Text1 title={`${user?.followers?.length} Followers`} />

            <Text1 title={`${user?.following?.length} Following`} />
          </div>
        </div>
        {UNSECURED(userData).user._id === id && (
          // <ThirdButton
          //   title="Details"
          //   classNames="edit_btn"
          //   onClick={() => setModal(true)}
          // />
          <IconButton onClick={() => setModal(true)} className="edit_btn">
            {" "}
            <MoreVertIcon sx={{ color: `var(--601)` }} />
          </IconButton>
        )}
      </div>
      <FullPageLoader open={open} setOpen={setOpen} />
      <EditModal modal={modal} setModal={setModal} user={user} />
    </>
  );
};

export default Profile;
