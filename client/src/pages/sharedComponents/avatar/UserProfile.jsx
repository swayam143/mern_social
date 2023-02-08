import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { Img_url } from "../../../constant";
import { UNSECURED } from "../../../constant/Util";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export const UserProfile = ({ imgSize }) => {
  const userData = useSelector((state) => state.auth.userData);
  return userData && UNSECURED(userData).user.picture !== "" ? (
    <img
      style={imgSize}
      className="img-fluid"
      src={`${Img_url}${UNSECURED(userData).user.picture}  `}
      alt="users"
    />
  ) : (
    <Avatar sx={{ bgcolor: deepPurple[500] }}>
      {userData && UNSECURED(userData)?.user?.fullname?.[0].toUpperCase()}
    </Avatar>
  );
};

export const UsersProfile = ({
  data,
  imgSize,
  onClick,
  className,
  avtr_classaName,
}) => {
  return data && data.picture !== "" ? (
    <Zoom style={{ display: "inline-block" }}>
      <img
        style={imgSize}
        className={className}
        src={`${Img_url}${data?.picture}`}
        alt="users"
      />{" "}
    </Zoom>
  ) : (
    <Avatar
      className={avtr_classaName}
      onClick={onClick}
      sx={{ bgcolor: deepPurple[500] }}
    >
      {data && data?.fullname?.[0].toUpperCase()}
    </Avatar>
  );
};

export const PostUserProfile = ({ data, user, imgSize }) => {
  //   console.log(data?.user?.picture !== "");
  return data && data?.user?.picture !== "" ? (
    <Zoom>
      <img
        style={imgSize}
        className="img-fluid "
        src={` ${Img_url}${
          data && (data?.user?._id === user?._id || data?.user === user._id)
            ? user?.picture
            : data?.user?.picture
        }`}
        alt="users"
      />
    </Zoom>
  ) : (
    <Avatar sx={{ bgcolor: deepPurple[500] }}>
      {data && (data?.user?._id === user?._id || data?.user === user._id)
        ? user?.fullname?.[0].toUpperCase()
        : data?.user?.fullname?.[0].toUpperCase()}
    </Avatar>
  );
};
