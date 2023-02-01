import "./Buttons.css";
import Button from "@mui/material/Button";

export const PrimaryButton = ({ title, sx, classNames, onClick }) => {
  return (
    <Button
      onClick={() =>
        setTimeout(async () => {
          onClick();
        }, 500)
      }
      sx={sx}
      variant="contained"
      className={` ${classNames} primarybtn`}
    >
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

export const ThirdButton = ({ title, classNames, onClick, sx }) => {
  return (
    <Button
      sx={sx}
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
