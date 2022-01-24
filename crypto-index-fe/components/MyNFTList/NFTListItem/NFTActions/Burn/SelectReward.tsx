import { FC, ChangeEvent } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";

interface SelectRewardProps {
  selectedReward: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  burnNFT: () => void;
}

const SelectReward: FC<SelectRewardProps> = ({
  handleChange,
  selectedReward,
  burnNFT,
}) => {
  return (
    <Box>
      <FormControl
        sx={{
          margin: "15px 30px 30px 30px",
        }}
      >
        <RadioGroup
          defaultValue="dai"
          value={selectedReward}
          onChange={handleChange}
        >
          <FormControlLabel
            value="dai"
            control={<Radio />}
            label="Rewards in DAI"
          />
          <FormControlLabel
            value="comp&snx"
            control={<Radio />}
            label="Rewards in COMP and SNX"
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        sx={{ position: "absolute", bottom: "0", right: "0", margin: "15px" }}
        onClick={burnNFT}
      >
        Burn NFT
      </Button>
    </Box>
  );
};

export default SelectReward;
