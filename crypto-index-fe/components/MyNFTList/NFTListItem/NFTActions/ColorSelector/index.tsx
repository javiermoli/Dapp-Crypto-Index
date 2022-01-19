import { SelectChangeEvent } from "@mui/material";
import React, { FC, useState } from "react";
import { useTokenApprove } from "../../../../../hooks/useTokenApprove";
import SelectColor from "./SelectColor";

interface SelectMetadataProps {
  setTokenColor: (id: number, selectedColor: string) => void;
  tokenId: number;
}

const SelectMetadata: FC<SelectMetadataProps> = ({
  setTokenColor,
  tokenId,
}) => {
  const [color, setColor] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    setColor(value);
  };

  const submitSelectedColor = () => {
    if (tokenId >= 0 && color) {
      setTokenColor(tokenId, color);
    }
  };

  return (
    <SelectColor
      submitSelectedColor={submitSelectedColor}
      selectedValue={color}
      handleChange={handleChange}
    />
  );
};

export default SelectMetadata;
