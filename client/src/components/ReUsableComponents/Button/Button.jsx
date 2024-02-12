import { Box, IconButton } from "@mui/material";
import React from "react";

const CustomButton = ({
  size,
  color,
  ariaLabel,
  onClick,
  children,
  className,
}) => {
  return (
    <Box>
      <IconButton
        size={size}
        className={className}
        color={color}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </IconButton>
    </Box>
  );
};

export default CustomButton;
