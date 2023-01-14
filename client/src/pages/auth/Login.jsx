import React from "react";
import { Heading1 } from "../../components/heading/Heading";
import { TextFields1 } from "../../components/textField/Textfields";
import { SecondaryButton, ThirdButton } from "../../components/button/Buttons";
import "./auth.css";
import { Text1 } from "../../components/text/Texts";
import { IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="full_body">
      {" "}
      <form className="login_form mx-2">
        <Heading1 title="Login" classNames="text-center" />
        <TextFields1 type="text" classNames="mt-4" placeholder="Email" />
        <div className="relative">
          <TextFields1
            type={showPass ? "text" : "password"}
            classNames="mt-4"
            placeholder="Password"
          />
          <IconButton
            className="password_visible"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </div>
        <SecondaryButton title="Login" classNames="w-100 my-3" />
        <Text1 title="Don't have an account Yet" />

        <ThirdButton title="Register" classNames="w-100 my-3" />
      </form>
    </div>
  );
};

export default Login;
