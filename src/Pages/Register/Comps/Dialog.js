import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function MyDialog({
  open,
  maxWidth = "lg",
  handleClose,
  children,
  title,
  ...rest
}) {
  return (
    <Dialog
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
      {...rest}
    >
      <DialogTitle className="d-flex align-items-center justify-content-between px-3 py-2">
        {title}
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <Divider />

      <div className="p-3">{children}</div>
    </Dialog>
  );
}