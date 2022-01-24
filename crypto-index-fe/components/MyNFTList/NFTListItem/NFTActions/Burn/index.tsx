import { Typography } from "@mui/material";
import { useState, ChangeEvent, FC } from "react";
import SelectReward from "./SelectReward";

interface BurnProps {
  burn: (tokenId: number, reward: boolean) => void;
  tokenId: number;
}

const Burn: FC<BurnProps> = ({ tokenId, burn }) => {
  const [reward, setReward] = useState("dai");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setReward(value);
  };

  const burnNFT = () => {
    if (tokenId >= 0) {
      burn(tokenId, reward === "dai");
    }
  };

  return (
    <>
      <Typography sx={{ marginBottom: "10px" }} variant="h6" component="h2">
        Burn NFT
      </Typography>
      <SelectReward
        selectedReward={reward}
        handleChange={handleChange}
        burnNFT={burnNFT}
      />
    </>
  );
};

export default Burn;
