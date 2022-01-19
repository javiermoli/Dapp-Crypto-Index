import { FC } from "react";
import { Button, Typography } from "@mui/material";
import { ListedNFTData } from "./ListedNftCardFooter";
import { formatUnits } from "@ethersproject/units";
import { Box } from "@mui/system";

interface ActionButtonProps {
  listedNftData: ListedNFTData;
  onClick: () => void;
  buttonLabel: string;
}

const ActionButton: FC<ActionButtonProps> = ({
  listedNftData,
  onClick,
  buttonLabel,
}) => {
  const { price } = listedNftData;
  const priceInEther = formatUnits(price, "ether");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button onClick={onClick}>{buttonLabel}</Button>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {priceInEther} Ether
        </Typography>
      </Box>
    </>
  );
};

export default ActionButton;
