import "./Buttons.css";
import Button from "@mui/material/Button";

export const PrimaryButton = ({ title }) => {
  return (
    <Button variant="contained" className="primarybtn">
      {title}
    </Button>
  );
};

export const SecondaryButton = ({ title, classNames }) => {
  return (
    <Button variant="contained" className={`${classNames} secondry_btn`}>
      {title}
    </Button>
  );
};

export const ThirdButton = ({ title, classNames }) => {
  return (
    <Button variant="contained" className={`${classNames} third_btn`}>
      {title}
    </Button>
  );
};
