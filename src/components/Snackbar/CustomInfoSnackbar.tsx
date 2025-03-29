import { forwardRef } from "react";
import { SnackbarContent, CustomContentProps } from "notistack";
import { Alert } from "@mui/material";

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
          sx={{
            width: "100%", // Ensure alert takes full width of the snackbar
            backgroundColor: "#03045e", // Custom dark blue background
            color: "#ffffff", // White text
            "& .MuiAlert-icon": {
              color: "#ffffff", // White icon
            },
          }}
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
