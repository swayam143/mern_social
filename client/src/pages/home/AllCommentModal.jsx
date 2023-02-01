import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import { Text1 } from "../../components/text/Texts";
import { Img_url } from "../../constant";
import moment from "moment";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: "  #ccc 0 5px 16px",
  p: 1,
  borderRadius: "6px",
  maxWidth: "90%",
};

export default function AllCommentModal({ open, setOpen, comments, user }) {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {comments?.length > 0 &&
              comments.map((data, i) => (
                <div key={i} className="mt-2">
                  <div style={{ gap: "10px" }} className="d-flex">
                    {data && data?.user?.picture !== "" ? (
                      <Zoom>
                        <img
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                          className="img-fluid "
                          src={` ${Img_url}${
                            data &&
                            (data?.user?._id === user?._id ||
                              data?.user === user._id)
                              ? user?.picture
                              : data?.user?.picture
                          }`}
                          alt="users"
                        />{" "}
                      </Zoom>
                    ) : (
                      <Avatar sx={{ bgcolor: deepPurple[500] }}>
                        {data &&
                        (data?.user?._id === user?._id ||
                          data?.user === user._id)
                          ? user?.fullname?.[0].toUpperCase()
                          : data?.user?.fullname?.[0].toUpperCase()}
                      </Avatar>
                    )}
                    <div style={{ flexGrow: 1 }}>
                      <Text1
                        title={
                          data &&
                          (data?.user?._id === user?._id ||
                            data?.user === user._id)
                            ? user?.fullname
                            : data?.user?.fullname
                        }
                      />
                      <div
                        style={{ padding: "10px" }}
                        className="post_img_container "
                      >
                        <p className="fs_12">{data?.content}</p>
                        <div
                          style={{ gap: "10px" }}
                          className="d-flex align-items-center"
                        >
                          <p className="fs_10">
                            {" "}
                            {moment(data.createdAt).fromNow()}
                          </p>
                          <Text1 title={`${data?.likes?.length} likes`} />
                          <Text1 title={`Reply`} />
                        </div>

                        {/* {data?.length > 1 && (
                      <Text1
                        style={{ color: `var(--600)`, textAlign: "right" }}
                        title="View More"
                        classNames="mt-2 me-1 pointer"
                      />
                    )} */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
