import { FC, ChangeEvent } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface ListingTokenProps {
  isApprove: boolean;
  handleClick: () => void;
  price: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ListingToken: FC<ListingTokenProps> = ({
  isApprove,
  handleClick,
  price,
  handleChange,
}) => {
  const buttonLabel = isApprove ? "List Token" : "Approve Token";
  const helperText = isApprove
    ? "Please, add the price in ETHER that you would like to sell the NFT"
    : "Please approve the contract";

  return (
    <Box>
      <Typography> Add the NFT to the Marketplace</Typography>
      <TextField
        helperText={helperText}
        label="Price"
        variant="outlined"
        type="number"
        value={price}
        onChange={handleChange}
        disabled={!isApprove}
      />
      <Button onClick={handleClick}>{buttonLabel}</Button>
    </Box>
  );
};

export default ListingToken;
