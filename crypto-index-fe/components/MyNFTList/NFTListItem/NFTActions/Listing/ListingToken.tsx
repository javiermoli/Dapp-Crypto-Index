import { FC, ChangeEvent } from "react";
import { Button, TextField } from "@mui/material";
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
  const buttonLabel = isApprove ? "List" : "Approve";
  const helperText = isApprove
    ? "Please, add the price in ETHER that you would like to sell the NFT"
    : "Please approve the contract";

  return (
    <Box>
      <TextField
        sx={{
          margin: "15px 30px 30px 30px",
          minWidth: "280px",
          minHeight: "100px",
        }}
        helperText={helperText}
        label="Price"
        variant="outlined"
        type="number"
        value={price}
        onChange={handleChange}
        disabled={!isApprove}
      />
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
          margin: "15px",
          minWidth: "103px",
        }}
        onClick={handleClick}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
};

export default ListingToken;
