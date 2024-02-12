import { Box, TextField } from "@mui/material";
import React from "react";

const Input = ({ label, placeholder, value, onChange, className, size }) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      className={className}
      onChange={onChange}
      size={size}
      margin="normal"
      variant="outlined"
    />
  );
};

export default Input;
