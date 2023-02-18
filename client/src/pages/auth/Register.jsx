import React, { useState } from "react";
import { Heading1 } from "../../components/heading/Heading";
import { TextFields1 } from "../../components/textField/Textfields";
import { SecondaryButton, ThirdButton } from "../../components/button/Buttons";
import "./auth.css";
import { Text1 } from "../../components/text/Texts";
import {
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { POST } from "../../constant/RequestAuthService";
import { FullPageLoader } from "../../components/loader/Loaders";
import * as Validator from "validatorjs";
import { Error, Success, Validate } from "../../components/toast/Toasts";
import { motion } from "framer-motion";
import logo from "../../images/logo.png";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    cf_password: "",
    gender: "male",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOpen(true);

    const checkdata = {
      email: "required|email",
      password: "required",
      fullname: "required",
      username: "required",
      cf_password: "required|same:password",
      gender: "required",
    };

    const validation = new Validator(data, checkdata);

    if (validation.fails()) {
      Validate(validation);
      setOpen(false);
    } else {
      try {
        const response = await POST("register", data);
        if (response.status === 200) {
          Success(response.msg);
          setOpen(false);
          navigate("/login");
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
  return (
    <>
      <div class="container-fluid relative">
        <div className="logo_abs">
          <img src={logo} alt="Bootstrap" width="150" />
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 login-image reg_img"></div>
          <div class="col-md-6 col-sm-12 login-form d-flex align-items-center justify-content-center below_767">
            {" "}
            <motion.form
              initial={{ opacity: 0, scale: 0, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="login_form mx-2"
              onSubmit={handleSubmit}
            >
              <Heading1 title="Register" classNames="text-center" />

              <TextFields1
                type="text"
                classNames="mt-4"
                placeholder="Full Name"
                name="fullname"
                value={data.fullname}
                onChange={handleChange}
              />
              <TextFields1
                type="text"
                classNames="mt-4"
                placeholder="User Name"
                name="username"
                value={data.username}
                onChange={handleChange}
              />
              <TextFields1
                type="text"
                classNames="mt-4"
                placeholder="Email Address"
                name="email"
                value={data.email}
                onChange={handleChange}
              />

              <div className="relative">
                <TextFields1
                  type={showPass ? "text" : "password"}
                  classNames="mt-4"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                />
                <IconButton
                  className="password_visible"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>
              <div className="relative">
                <TextFields1
                  type={showPass2 ? "text" : "password"}
                  classNames="mt-4"
                  placeholder="Confrim Password"
                  name="cf_password"
                  value={data.cf_password}
                  onChange={handleChange}
                />
                <IconButton
                  className="password_visible"
                  onClick={() => setShowPass2(!showPass2)}
                >
                  {showPass2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </div>
              <div className="d-flex justify-content-center mt-3 ">
                {" "}
                <FormControl>
                  <RadioGroup
                    row
                    // aria-labelledby="demo-row-radio-buttons-group-label"
                    // name="row-radio-buttons-group"
                    value={data.gender}
                    onChange={(e) =>
                      setData({ ...data, gender: e.target.value })
                    }
                    // name="gender"
                  >
                    {" "}
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio
                          sx={{
                            color: `var(--700)`,
                            "&.Mui-checked": {
                              color: `var(--500)`,
                            },
                          }}
                        />
                      }
                      label="Male"
                    />
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio
                          sx={{
                            color: `var(--700)`,
                            "&.Mui-checked": {
                              color: `var(--500)`,
                            },
                          }}
                        />
                      }
                      label="Female"
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio
                          sx={{
                            color: `var(--700)`,
                            "&.Mui-checked": {
                              color: `var(--500)`,
                            },
                          }}
                        />
                      }
                      label="Other"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <SecondaryButton
                title="Register"
                classNames="w-100 my-3"
                type="submit"
              />
              <Text1 title="Already Have an Account" />

              <ThirdButton
                title="Login"
                classNames="w-100 my-3"
                onClick={() => navigate("/login")}
              />
              {/* <Button onClick={() => setOpen(!open)}>show</Button> */}
              <FullPageLoader open={open} setOpen={setOpen} />
            </motion.form>
          </div>
        </div>
      </div>
      {/* <div className="full_body">
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="login_form mx-2"
          onSubmit={handleSubmit}
        >
          <Heading1 title="Register" classNames="text-center" />

          <TextFields1
            type="text"
            classNames="mt-4"
            placeholder="Full Name"
            name="fullname"
            value={data.fullname}
            onChange={handleChange}
          />
          <TextFields1
            type="text"
            classNames="mt-4"
            placeholder="User Name"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          <TextFields1
            type="text"
            classNames="mt-4"
            placeholder="Email Address"
            name="email"
            value={data.email}
            onChange={handleChange}
          />

          <div className="relative">
            <TextFields1
              type={showPass ? "text" : "password"}
              classNames="mt-4"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            <IconButton
              className="password_visible"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <div className="relative">
            <TextFields1
              type={showPass2 ? "text" : "password"}
              classNames="mt-4"
              placeholder="Confrim Password"
              name="cf_password"
              value={data.cf_password}
              onChange={handleChange}
            />
            <IconButton
              className="password_visible"
              onClick={() => setShowPass2(!showPass2)}
            >
              {showPass2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
          <div className="d-flex justify-content-center mt-3 ">
            {" "}
            <FormControl>
              <RadioGroup
                row
                // aria-labelledby="demo-row-radio-buttons-group-label"
                // name="row-radio-buttons-group"
                value={data.gender}
                onChange={(e) => setData({ ...data, gender: e.target.value })}
                // name="gender"
              >
                {" "}
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: `var(--700)`,
                        "&.Mui-checked": {
                          color: `var(--500)`,
                        },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: `var(--700)`,
                        "&.Mui-checked": {
                          color: `var(--500)`,
                        },
                      }}
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  value="other"
                  control={
                    <Radio
                      sx={{
                        color: `var(--700)`,
                        "&.Mui-checked": {
                          color: `var(--500)`,
                        },
                      }}
                    />
                  }
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <SecondaryButton
            title="Register"
            classNames="w-100 my-3"
            type="submit"
          />
          <Text1 title="Already Have an Account" />

          <ThirdButton
            title="Login"
            classNames="w-100 my-3"
            onClick={() => navigate("/login")}
          />
          {/* <Button onClick={() => setOpen(!open)}>show</Button> */}
      <FullPageLoader open={open} setOpen={setOpen} />
      {/* </motion.form>
      </div> */}{" "}
    </>
  );
};

export default Register;
