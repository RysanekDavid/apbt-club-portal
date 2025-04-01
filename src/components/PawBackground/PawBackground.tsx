import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import pawLight from "../../assets/paw.png";
import pawDark from "../../assets/paw_inverted.png";

interface PawData {
  id: number;
  top: string;
  left: string;
  rotation: number;
  size: number;
  opacity: number;
}

const PawBackground: React.FC = () => {
  const theme = useTheme();
  const pawImage = theme.palette.mode === "dark" ? pawDark : pawLight;
  const numberOfPaws = 10; // Further reduced number of paws

  const paws = useMemo(() => {
    const generatedPaws: PawData[] = [];
    for (let i = 0; i < numberOfPaws; i++) {
      let leftPosition: number;
      // Roughly 50% chance for left side, 50% for right side
      if (Math.random() < 0.5) {
        // Left side (-5% to 25%)
        leftPosition = Math.random() * 30 - 5;
      } else {
        // Right side (70% to 105%)
        leftPosition = 70 + Math.random() * 35;
      }

      generatedPaws.push({
        id: i,
        top: `${Math.random() * 110 - 10}%`, // -10% to 100% vertically
        left: `${leftPosition}%`, // Use the generated left position
        rotation: Math.random() * 140 - 70, // Rotation between -70 and +70 degrees
        size: 70 + Math.random() * 60, // Slightly smaller max size (70px to 130px)
        opacity: 0.05 + Math.random() * 0.08, // Slightly lower max opacity (0.05 to 0.13)
      });
    }
    return generatedPaws;
  }, []); // Generate only once on mount

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden", // Hide paws overflowing the container
        zIndex: -1, // Ensure paws are behind the main content
        pointerEvents: "none", // Make sure paws don't interfere with clicks
      }}
    >
      {paws.map((paw) => (
        <Box
          key={paw.id}
          component="img"
          src={pawImage}
          alt="" // Decorative image
          sx={{
            position: "absolute",
            top: paw.top,
            left: paw.left,
            width: `${paw.size}px`,
            height: `${paw.size}px`,
            transform: `rotate(${paw.rotation}deg)`,
            opacity: paw.opacity,
            userSelect: "none", // Prevent image selection
          }}
        />
      ))}
    </Box>
  );
};

export default PawBackground;
