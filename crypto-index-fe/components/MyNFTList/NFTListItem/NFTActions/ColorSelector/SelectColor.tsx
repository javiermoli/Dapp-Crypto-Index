import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { FC } from "react";

interface SelectedRewardProps {
  handleChange: (e: SelectChangeEvent) => void;
  selectedValue: string;
  submitSelectedColor: () => void;
}

const COLORS = ["Black", "White", "Green", "Yellow"];

const SelectColor: FC<SelectedRewardProps> = ({
  handleChange,
  selectedValue,
  submitSelectedColor,
}) => {
  return (
    <Box>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="select-nft-color-label">Color</InputLabel>
        <Select
          labelId="select-nft-color-label"
          id="select-nft-color"
          value={selectedValue}
          onChange={handleChange}
          label="Color"
        >
          <MenuItem value="">
            <em>--Choose a color--</em>
          </MenuItem>
          {COLORS.map((color, index) => (
            <MenuItem key={color} value={index}>
              {color}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>Select your NFT color.</FormHelperText>
      </FormControl>
      <Button onClick={submitSelectedColor}>Select Color</Button>
    </Box>
  );
};

export default SelectColor;
