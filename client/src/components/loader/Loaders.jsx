import { Backdrop } from "@mui/material";

import loading from "../../images/loading.gif";

export const FullPageLoader = ({ open, setOpen }) => {
  //   const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <img src={loading} alt="loading" style={{ width: "60px" }} />
    </Backdrop>
  );
};
