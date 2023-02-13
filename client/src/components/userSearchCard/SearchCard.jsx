import React from "react";
import { Heading1 } from "../../components/text/Texts";

import { UsersProfile } from "../../pages/sharedComponents/avatar/UserProfile";

const SearchCard = ({ data, onClick }) => {
  return (
    <div
      style={{ gap: "15px" }}
      className="my-2 d-flex align-items-center pointer"
    >
      <UsersProfile
        data={data}
        onClick={onClick}
        noZoom
        imgSize={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
      <div onClick={onClick}>
        <Heading1 title={data.username} />
      </div>
    </div>
  );
};

export default SearchCard;
