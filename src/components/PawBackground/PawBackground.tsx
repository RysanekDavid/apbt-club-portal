import React from "react";
import { Box, useTheme } from "@mui/material";
import pawLight from "../../assets/paw.png";
import pawDark from "../../assets/paw_inverted.png";
import * as styles from "./PawBackground.styles"; // Import styles

interface PawData {
  id: number;
  top: string;
  left: string;
  rotation: number;
  size: number;
  opacity: number;
}

// Static array with 15 predefined paw configurations
const staticPaws: PawData[] = [
  { id: 1, top: "5%", left: "10%", rotation: -20, size: 90, opacity: 0.08 },
  { id: 2, top: "15%", left: "85%", rotation: 30, size: 110, opacity: 0.1 },
  { id: 3, top: "30%", left: "5%", rotation: 15, size: 75, opacity: 0.06 },
  { id: 4, top: "40%", left: "90%", rotation: -45, size: 100, opacity: 0.09 },
  { id: 5, top: "55%", left: "15%", rotation: 50, size: 120, opacity: 0.11 },
  { id: 6, top: "65%", left: "80%", rotation: -10, size: 85, opacity: 0.07 },
  { id: 7, top: "80%", left: "10%", rotation: 60, size: 95, opacity: 0.08 },
  { id: 8, top: "90%", left: "95%", rotation: -30, size: 105, opacity: 0.1 },
  { id: 9, top: "2%", left: "75%", rotation: 10, size: 80, opacity: 0.05 },
  { id: 10, top: "25%", left: "98%", rotation: 40, size: 90, opacity: 0.07 },
  { id: 11, top: "50%", left: "-5%", rotation: -50, size: 115, opacity: 0.12 },
  { id: 12, top: "70%", left: "20%", rotation: 25, size: 70, opacity: 0.06 },
  { id: 13, top: "88%", left: "70%", rotation: -60, size: 100, opacity: 0.09 },
  { id: 14, top: "10%", left: "-2%", rotation: 35, size: 88, opacity: 0.07 },
  { id: 15, top: "95%", left: "30%", rotation: -5, size: 92, opacity: 0.08 },
];

const PawBackground: React.FC = () => {
  const theme = useTheme();
  const pawImage = theme.palette.mode === "dark" ? pawDark : pawLight;

  // Use the static array directly
  const paws = staticPaws;

  return (
    <Box sx={styles.backgroundContainer}>
      {paws.map((paw) => (
        <Box
          key={paw.id}
          component="img"
          src={pawImage}
          alt="" // Decorative image
          sx={{
            ...styles.pawImageBase, // Apply base styles
            // Keep dynamic styles inline
            top: paw.top,
            left: paw.left,
            width: `${paw.size}px`,
            height: `${paw.size}px`,
            transform: `rotate(${paw.rotation}deg)`,
            opacity: paw.opacity,
          }}
        />
      ))}
    </Box>
  );
};

export default PawBackground;
