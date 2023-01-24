import React from "react";
import { Heading1 } from "../../components/text/Texts";
import { Avatar } from "@mui/material";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Img_url } from "../../constant";
import { deepPurple } from "@mui/material/colors";

const SearchCard = ({ data, onClick }) => {
  //   console.log(data);
  return (
    <div
      style={{ gap: "15px" }}
      className="my-2 d-flex align-items-center pointer"
    >
      {data && data.picture !== "" ? (
        <Zoom>
          <img
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            className="img-fluid "
            src={`${Img_url}${data?.picture}`}
            alt="users"
          />{" "}
        </Zoom>
      ) : (
        <Avatar onClick={onClick} sx={{ bgcolor: deepPurple[500] }}>
          {data && data?.fullname?.[0].toUpperCase()}
        </Avatar>
      )}
      <div onClick={onClick}>
        <Heading1 title={data.username} />
      </div>
    </div>
  );
};

export default SearchCard;
