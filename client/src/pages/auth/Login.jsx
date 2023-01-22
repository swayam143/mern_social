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
import { POST } from "../../constant/RequestAuthService";
import { useDispatch } from "react-redux";
import { isLogin } from "../../redux/authSlice";
import { Error, Success, Validate } from "../../components/toast/Toasts";
// import { UNSECURED } from "../../constant/Util";
import { FullPageLoader } from "../../components/loader/Loaders";
import { useNavigate } from "react-router-dom";
import Validator from "validatorjs";

const Login = () => {
  // const userData = useSelector((state) => state.auth.userData);
  // console.log(userData && UNSECURED(userData));
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);

    const checkdata = {
      email: "required|email",
      password: "required",
    };

    const validation = new Validator({ email, password }, checkdata);
    if (validation.fails()) {
      Validate(validation);
      setOpen(false);
    } else {
      try {
        const response = await POST("login", { email, password });
        if (response.status === 200) {
          dispatch({ type: isLogin, payload: response.data });
          Success(response.data.msg);
          setOpen(false);
          navigate("/");
        } else {
          Error(response.status.msg);
          setOpen(false);
        }
      } catch (err) {
        Error(err);
        setOpen(false);
      }
    }
  };

  const navigate = useNavigate();

  return (
    <div className="full_body">
      {" "}
      <form className="login_form mx-2" onSubmit={handleSubmit}>
        <Heading1 title="Login" classNames="text-center" />

        <TextFields1
          type="text"
          classNames="mt-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="relative">
          <TextFields1
            type={showPass ? "text" : "password"}
            classNames="mt-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <IconButton
            className="password_visible"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </IconButton>
        </div>
        <SecondaryButton title="Login" classNames="w-100 my-3" type="submit" />
        <Text1 title="Don't have an account Yet" />

        <ThirdButton
          title="Register"
          classNames="w-100 my-3"
          onClick={() => navigate("/register")}
        />
        {/* <Button onClick={() => setOpen(!open)}>show</Button> */}
        <FullPageLoader open={open} setOpen={setOpen} />
      </form>
    </div>
  );
};

export default Login;
