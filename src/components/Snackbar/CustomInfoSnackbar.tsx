import { forwardRef } from "react";
import { SnackbarContent, CustomContentProps } from "notistack";
import { Alert } from "@mui/material";
import * as styles from "./CustomInfoSnackbar.styles"; // Import styles

// Define the props for our custom component, extending notistack's props
interface CustomInfoSnackbarProps extends CustomContentProps {
  // Add any other custom props you might need
}

const CustomInfoSnackbar = forwardRef<HTMLDivElement, CustomInfoSnackbarProps>(
  ({ id, message, ...props }, ref) => {
    // Use MUI Alert for styling
    return (
      // Use SnackbarContent as the wrapper for accessibility and notistack integration
      <SnackbarContent ref={ref} role="alert" {...props}>
        <Alert
          severity="info"
          sx={styles.alertStyle}
          elevation={6} // Optional: match default snackbar elevation
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);

CustomInfoSnackbar.displayName = "CustomInfoSnackbar"; // Add display name

export default CustomInfoSnackbar;
