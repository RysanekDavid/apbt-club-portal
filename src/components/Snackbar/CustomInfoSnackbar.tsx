import { forwardRef } from "react";
import { SnackbarContent, CustomContentProps } from "notistack";
import { Alert } from "@mui/material";
import * as styles from "./CustomInfoSnackbar.styles";

interface CustomInfoSnackbarProps extends CustomContentProps {}

const CustomInfoSnackbar = forwardRef<HTMLDivElement, CustomInfoSnackbarProps>(
  ({ id, message, ...props }, ref) => {
    return (
      <SnackbarContent ref={ref} role="alert" {...props}>
        <Alert severity="info" sx={styles.alertStyle} elevation={6}>
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

CustomInfoSnackbar.displayName = "CustomInfoSnackbar";

export default CustomInfoSnackbar;
