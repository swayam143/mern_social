import "./Buttons.css";
import Button from "@mui/material/Button";

export const PrimaryButton = ({ title }) => {
  return (
    <Button variant="contained" className="primarybtn">
      {title}
    </Button>
  );
};

export const SecondaryButton = ({ title, classNames, type, onClick }) => {
  return (
    <Button
      onClick={() =>
        setTimeout(async () => {
          onClick();
        }, 500)
      }
      type={type}
      variant="contained"
      className={`${classNames} secondry_btn`}
    >
      {title}
    </Button>
  );
};

export const ThirdButton = ({ title, classNames, onClick }) => {
  return (
    <Button
      onClick={() =>
        setTimeout(async () => {
          onClick();
        }, 500)
      }
      variant="contained"
      className={`${classNames} third_btn`}
    >
      {title}
    </Button>
  );
};
