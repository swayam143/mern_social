import React, { useEffect } from "react";
import { useHomeFunctanility } from "../home/useHomeApi";

const Discover = () => {
  const { getAllPosts } = useHomeFunctanility();

  useEffect(() => {
    getAllPosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return <>Discover</>;
};

export default Discover;
