import { FC, ChangeEvent } from "react";
import { Button, FormControlLabel, Switch } from "@mui/material";
import { Box } from "@mui/system";

interface SelectRewardProps {
  checked: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  burnNFT: () => void;
}

const SelectReward: FC<SelectRewardProps> = ({
  handleChange,
  checked,
  burnNFT,
}) => {
  const switchLabel = checked
    ? "Get the rewards in DAI"
    : "Get rewards in COMP and SNX";

  return (
    <Box>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleChange} />}
        label={switchLabel}
      />
      <Button onClick={burnNFT}>Burn NFT</Button>
    </Box>
  );
};

export default SelectReward;
