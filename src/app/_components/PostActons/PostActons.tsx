import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Badge from "@mui/material/Badge";
import useAddPost from "@/app/_hooks/Posts/useAddPost";
import { toast } from "react-toastify";
import useEditPost from "@/app/_hooks/Posts/useEditPost";
import useRemovePost from "@/app/_hooks/Posts/useRemovePost";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, sm: 600 },
  bgcolor: "#06141D",
  boxShadow: 24,
  p: 2,
  borderRadius: "6px",
  color: "white",
};

export default function PostActons({ postId, data }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const formData = new FormData();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [fileValue, setFieldValue] = React.useState(null);
  const [srcValue, setSrcValue] = React.useState(null);
  const [postBody, setPostBody] = React.useState("");
  const { mutateAsync, isPending, isError, reset } = useEditPost();
  const { mutateAsync: removePost, isPending: removePending } = useRemovePost();

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ py: 1 }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Share Your Mood
          </Typography>
          <hr></hr>
          <textarea
            className="add-post"
            value={postBody}
            onChange={() => {
              setPostBody(event.target.value);
            }}
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              borderRadius: "12px",
              height: "80px",
              backgroundColor: "#1B2730",
              color: "white",
            }}
            placeholder="Say Something?"
          ></textarea>
          <>
            {!srcValue && (
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{ my: 2, mr: 1 }}
              >
                Upload Photo
                <VisuallyHiddenInput
                  accept="image/*"
                  type="file"
                  onChange={(event) => {
                    setFieldValue(event.target.files[0]);
                    const imageSrc = URL.createObjectURL(event.target.files[0]);
                    setSrcValue(imageSrc);
                    reset();
                  }}
                  multiple
                />
              </Button>
            )}

            {srcValue && (
              <div
                style={{
                  position: "relative",
                  maxWidth: "400px",
                  margin: "auto",
                  paddingBottom: "8px",
                }}
              >
                <Badge
                  onClick={() => {
                    setSrcValue("");
                    reset();
                  }}
                  sx={{ cursor: "pointer", position: "absolute", right: "0" }}
                  badgeContent={"x"}
                  color="primary"
                ></Badge>
                <div
                  style={{
                    maxHeight: "380px",
                    maxWidth: "100%",
                    overflow: "hidden",
                  }}
                >
                  <img width="100%" src={srcValue} alt={srcValue}></img>
                </div>
              </div>
            )}
          </>
          <hr></hr>
          <Box
            sx={{
              pt: 2,
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Button
              disabled={isPending || !postBody}
              onClick={async () => {
                formData.append("body", postBody);
                if (fileValue?.length > 0) {
                  formData.append("image", fileValue);
                }
                const req = await mutateAsync({ formData, postId });
                if (req.data.message == "success") {
                  toast.success("Your Post Updated successfully");
                  setSrcValue("");
                  setPostBody("");
                  setOpenModal(false);
                }
              }}
              sx={{
                borderColor: "#1B2730",
                color: "white",
                mx: 1,
                ":disabled": { bgcolor: "transparent", color: "black" },
                ":hover": { borderColor: "#1B2730" },
              }}
              variant="outlined"
              size="small"
            >
              {isPending ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
            </Button>
            <Button
              onClick={() => {
                setOpenModal(false);
              }}
              variant="outlined"
              size="small"
              sx={{
                color: "white",
                borderColor: "#1B2730",
                ":hover": { borderColor: "#1B2730" },
              }}
            >
              Cancel
            </Button>
          </Box>
          {isError && (
            <p style={{ color: "red", textAlign: "center" }}>
              Image is too large!
            </p>
          )}
        </Box>
      </Modal>
      {removePending ? (
        <i
          className="fa fa-spinner fa-spin"
          style={{ marginRight: "10px", fontSize: "20px", marginTop: "8px" }}
        ></i>
      ) : (
        <ButtonGroup
          ref={anchorRef}
          aria-label="Button group with a nested menu"
        >
          <Button
            sx={{
              bgcolor: "transparent",
              border: "none",
              ":hover": { border: "none" },
              color: "white",
            }}
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <MoreVertIcon />
          </Button>
        </ButtonGroup>
      )}

      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  sx={{ bgcolor: "#06141D", color: "white" }}
                  id="split-button-menu"
                  autoFocusItem
                >
                  <MenuItem
                    onClick={(event) => {
                      setOpenModal(true);
                      handleMenuItemClick(event, 0);
                      setSrcValue(data?.image);
                      setPostBody(data?.body);
                    }}
                  >
                    Edit <EditIcon sx={{ fontSize: "16px", ml: 3 }} />
                  </MenuItem>
                  <MenuItem
                    onClick={(event) => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          removePost(postId);
                          Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                          });
                        }
                      });
                      handleMenuItemClick(event, 0);
                    }}
                  >
                    Delete
                    <DeleteForeverIcon sx={{ fontSize: "16px", ml: 1 }} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
