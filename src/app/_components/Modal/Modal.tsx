import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Badge from "@mui/material/Badge";
import useAddPost from "@/app/_hooks/Posts/useAddPost";
import { toast } from "react-toastify";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
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
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "6px",
};

export default function PostModal() {
  const formData = new FormData();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fileValue, setFieldValue] = React.useState(null);
  const [srcValue, setSrcValue] = React.useState(null);
  const [postBody, setPostBody] = React.useState("");
  const { mutateAsync, isPending, isError, reset } = useAddPost();

  return (
    <div>
      <textarea
        onClick={handleOpen}
        className="add-post"
        placeholder="Say Something?"
        style={{ backgroundColor: "#28343E", color: "white" }}
      ></textarea>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ backgroundColor: "#06141D" }}>
          <Typography
            sx={{ py: 1, color: "white" }}
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
                tabIndex={-1}
                startIcon={<AddPhotoAlternateIcon />}
                sx={{
                  my: 2,
                  px: 2,
                  py: 1,
                  border: "1px solid #1B2730",
                  borderRadius: 3,
                  color: "white",
                }}
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

                    console.log(imageSrc);
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
                if (fileValue) {
                  formData.append("image", fileValue);
                }
                const req = await mutateAsync(formData);
                if (req.data.message == "success") {
                  toast.success("Your Post Created successfully");
                  setSrcValue("");
                  setPostBody("");
                  setOpen(false);
                }
              }}
              sx={{
                mx: 1,
                color: "white",
                border: "1px solid #1B2730",
                ":disabled": {
                  bgcolor: "transparent",
                  border: "1px solid #1B2730",
                  color: "#1B2730",
                },
              }}
              variant="outlined"
              size="small"
            >
              {isPending ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
              variant="outlined"
              size="small"
              sx={{ color: "white", borderColor: "#1B2730" }}
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
    </div>
  );
}
