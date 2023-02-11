import React, { useState } from "react";
// import { Button } from "./Styles";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./Scroll.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
		in place of 'smooth' */
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    // <button className="scroll_btn">
    <NavigationIcon
      className="scroll_btn"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    />
    // </button>
  );
};

export default ScrollToTop;
