import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  PrimaryButton,
  SecondaryButton,
} from "../../../components/button/Buttons";
import { Heading1 } from "../../../components/text/Texts";
import { Error, Success } from "../../../components/toast/Toasts";
import SearchCard from "../../../components/userSearchCard/SearchCard";
import { Base_url } from "../../../constant";
import { followsUser } from "../../../redux/authSlice";
import "./Suggestions.css";
import CachedIcon from "@mui/icons-material/Cached";
import { useHomeFunctanility } from "../useHomeApi";

const Suggestions = ({ user }) => {
  const navigate = useNavigate();
  const [suggest, setSuggest] = useState([]);

  const { getPosts, getAllPosts } = useHomeFunctanility();

  // console.log(user);

  useEffect(() => {
    if (user?._id) {
      getSuggestions();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(user);

  const getSuggestions = async () => {
    const response = await axios.post(`${Base_url}user/suggestions`, {
      userId: user._id,
    });

    setSuggest(response.data.users);
  };

  const dispatch = useDispatch();

  const followUser = async (data) => {
    // dispatch({ type: followsUser, payload: data });
    const response = await axios.post(`${Base_url}user/${data._id}/follow`, {
      userId: user._id,
    });

    if (response.status === 200) {
      getPosts(user);
      getAllPosts();
      dispatch({ type: followsUser, payload: data });
      await Success(response.data.msg);
    }
  };

  const unfollowUser = async (data) => {
    // dispatch({ type: followsUser, payload: data });
    const response = await axios.post(`${Base_url}user/${data._id}/unfollow`, {
      userId: user._id,
    });
    // dispatch({ type: followsUser, payload: data });
    if (response.status === 200) {
      getPosts(user);
      getAllPosts();
      dispatch({ type: followsUser, payload: data });
      await Error(response.data.msg);
    }
  };
  return (
    suggest?.length > 0 && (
      <div className="suggestion_box">
        <div className="d-flex align-items-center justify-content-between mb-3">
          {" "}
          <Heading1 title="Suggestions" classNames="" />
          <CachedIcon className="pointer" onClick={getSuggestions} />
        </div>

        <div className=" card_post">
          {suggest.map((data, i) => (
            <div key={i} className="d-flex  align-items-center">
              <SearchCard
                data={data}
                onClick={() => navigate(`/profile/${data._id}`)}
              />
              {user?.following?.find((item) => item._id === data._id) ? (
                <PrimaryButton
                  onClick={() => unfollowUser(data)}
                  title="Following"
                  sx={{
                    color: "#000 !important",
                    margin: "0px 0px 0px auto !important",
                  }}
                />
              ) : (
                <SecondaryButton
                  title="Follow"
                  classNames="ms-auto  "
                  onClick={() => followUser(data)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default Suggestions;
