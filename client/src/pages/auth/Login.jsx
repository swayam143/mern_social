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
import { motion } from "framer-motion";
import logo from "../../images/logo.png";

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
        // console.log(response);
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
    <>
      {" "}
      <div class="container-fluid relative">
        <div className="logo_abs">
          <img src={logo} alt="Bootstrap" width="150" />
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 login-image"></div>
          <div class="col-md-6 col-sm-12 login-form d-flex align-items-center justify-content-center below_767">
            <motion.form
              initial={{ opacity: 0, scale: 0, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="login_form mx-2"
              onSubmit={handleSubmit}
            >
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
              <SecondaryButton
                title="Login"
                classNames="w-100 my-3"
                type="submit"
              />
              <Text1 title="Don't have an account Yet" />

              <ThirdButton
                title="Register"
                classNames="w-100 my-3"
                onClick={() => navigate("/register")}
              />
              {/* <Button onClick={() => setOpen(!open)}>show</Button> */}
              <FullPageLoader open={open} setOpen={setOpen} />
            </motion.form>
          </div>
        </div>
      </div>
      {/* <div className="full_body">
        <div className="container">
          <div class="row">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              class="col-md-6"
            >
              <img
                alt="dfg"
                src="https://images.pexels.com/photos/15291137/pexels-photo-15291137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                class="img-fluid"
              />
            </motion.div>
            <div class="col-md-6 d-flex align-items-center">
              {" "}
              <motion.form
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="login_form mx-2"
                onSubmit={handleSubmit}
              >
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
                <SecondaryButton
                  title="Login"
                  classNames="w-100 my-3"
                  type="submit"
                />
                <Text1 title="Don't have an account Yet" />

                <ThirdButton
                  title="Register"
                  classNames="w-100 my-3"
                  onClick={() => navigate("/register")}
                />
                {/* <Button onClick={() => setOpen(!open)}>show</Button> */}
      <FullPageLoader open={open} setOpen={setOpen} />
      {/* </motion.form>
            </div>
          </div>
        </div>
      </div> */}{" "}
    </>
  );
};

export default Login;
