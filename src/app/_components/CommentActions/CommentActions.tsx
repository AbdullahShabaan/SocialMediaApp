import * as React from "react";
import Swal from "sweetalert2";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import useDeleteComment from "@/app/_hooks/Comments/useDeleteComment";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import useGetSpecificPost from "@/app/_hooks/Posts/useGetSpecificPost";

export default function CommentActions({
  id,
  setCommentId,
  setEditComment,
  editComment,
  setComment,
  userPostId,
  postId,
  reset,
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const { mutateAsync: deleteComment } = useDeleteComment();
  const { mutateAsync: getSpecificPost } = useGetSpecificPost();
  const { id: currentUserId } = useSelector((state) => state.UserDataSlice);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

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
      <MoreVertIcon
        sx={{ marginRight: 1, cursor: "pointer", color: "white" }}
        ref={anchorRef}
        onClick={handleToggle}
      ></MoreVertIcon>
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
            <Paper sx={{ bgcolor: "transparent" }}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  sx={{ bgcolor: "#06141D", color: "white", borderRadius: 2 }}
                  autoFocusItem
                >
                  <MenuItem
                    onClick={() => {
                      setCommentId(id);
                      setEditComment(!editComment);
                      handleToggle();
                    }}
                  >
                    Edit
                  </MenuItem>
                  {currentUserId == userPostId && (
                    <MenuItem
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to delete this comment!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then(async (result) => {
                          if (result.isConfirmed) {
                            const response = await deleteComment(id);

                            if (response.status == 200) {
                              setComment(null);
                              Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                              });
                            }
                          }
                        });
                      }}
                    >
                      Delete
                    </MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}
